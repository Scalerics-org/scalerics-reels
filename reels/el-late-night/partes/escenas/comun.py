# Piezas compartidas por las escenas de el-late-night (personajes, escritorio, sillón, batería,
# público, celular). Los personajes están en coordenadas locales (~360 x 560, cabeza arriba, torso
# abajo): ponelos dentro de un <g transform="translate(x y) scale(s)">. Clases con prefijo P.
# Paleta: noche #0b1330/#1c2a5e, ámbar #ffb547, neón #ff3d6e, crema #fff1dc, madera #7a4524,
# verde agente #5ce611 (solo el agente de IA y Scalerics).

def NICO(P, tarjeta=True):
    brazo = f"""
              <g class="{P}-brazo">
                <path class="k" d="M300 470 C352 432 354 372 324 330 L294 344 C312 378 308 414 272 440 Z" />
                <g transform="rotate(12 330 280)">
                  <rect class="w" x="286" y="200" width="96" height="134" rx="8" />
                  <path d="M300 230 H366 M300 254 H352 M300 278 H362" stroke="#1c2a5e" stroke-width="6" stroke-linecap="round" />
                </g>
              </g>""" if tarjeta else ""
    return f"""
              <path class="k" d="M20 560 C20 420 90 366 180 366 C270 366 340 420 340 560 Z" />
              <path class="w" d="M146 370 L180 452 L214 370 Z" stroke-width="5" />
              <path class="y" d="M170 386 L190 386 L198 470 L180 494 L162 470 Z" stroke-width="5" />
              <path class="l" d="M132 378 L172 506 M228 378 L188 506" stroke-width="5" opacity="0.7" />
              <path class="b" d="M154 300 V378 H206 V300" />
              <ellipse class="b" cx="106" cy="246" rx="14" ry="22" stroke-width="6" /><ellipse class="b" cx="254" cy="246" rx="14" ry="22" stroke-width="6" />
              <ellipse class="b" cx="180" cy="236" rx="72" ry="82" />
              <path class="k" d="M104 226 C88 150 122 92 200 88 C262 86 290 132 262 214 C252 182 238 168 214 166 C220 140 200 128 174 136 C142 146 118 170 104 226 Z" />
              <path class="l" d="M150 120 C176 104 218 102 246 120" stroke-width="5" opacity="0.6" />
              <circle cx="154" cy="242" r="8" fill="#fff1dc" /><circle cx="206" cy="242" r="8" fill="#fff1dc" />
              <path class="l {P}-cejas" d="M132 214 C142 202 158 200 170 206 M192 212 C204 208 218 210 228 218" stroke-width="6" />
              <path class="w {P}-boca" d="M146 280 C160 314 200 314 214 280 Z" stroke-width="5" />{brazo}
"""

def AGENTE(P, lentes=False, sentado=False):
    piernas = f'<path class="gl {P}-ag-pies" d="M140 476 C140 520 120 530 96 540 M220 476 C220 520 240 530 264 540" stroke-width="10" />' if sentado else f'<path class="gl {P}-ag-pies" d="M140 476 V552 H112 M220 476 V552 H248" stroke-width="10" />'
    gafas = f"""
              <g class="{P}-ag-lentes">
                <rect x="92" y="160" width="80" height="58" rx="18" fill="#0b1330" stroke="#fff1dc" stroke-width="6" />
                <rect x="188" y="160" width="80" height="58" rx="18" fill="#0b1330" stroke="#fff1dc" stroke-width="6" />
                <path d="M172 180 H188" stroke="#fff1dc" stroke-width="6" />
                <path d="M106 176 L126 168 M202 176 L222 168" stroke="#fff1dc" stroke-width="5" stroke-linecap="round" opacity="0.7" />
              </g>""" if lentes else ""
    return f"""
              {piernas}
              <path class="gl {P}-ag-bi" d="M84 372 C40 384 28 430 38 470" stroke-width="10" />
              <path class="gl {P}-ag-bd" d="M276 372 C320 384 332 430 322 470" stroke-width="10" />
              <path class="k" d="M72 484 C72 384 112 330 180 330 C248 330 288 384 288 484 Z" />
              <path class="w" d="M150 334 L180 392 L210 334 Z" stroke-width="5" />
              <path class="l" d="M140 336 L168 470 M220 336 L192 470" stroke-width="5" opacity="0.6" />
              <path class="y" d="M146 350 L180 366 L214 350 L214 386 L180 370 L146 386 Z" stroke-width="5" />
              <path class="gl" d="M180 72 V40" stroke-width="7" />
              <circle class="g {P}-ag-ant" cx="180" cy="32" r="13" stroke-width="5" />
              <rect class="ag" x="74" y="70" width="212" height="236" rx="60" stroke-width="9" />
              <rect x="94" y="92" width="172" height="192" rx="44" fill="none" stroke="#5ce611" stroke-width="3" opacity="0.35" />
              <g class="{P}-ag-ojos">
                <rect x="118" y="160" width="36" height="58" rx="18" fill="#5ce611" />
                <rect x="206" y="160" width="36" height="58" rx="18" fill="#5ce611" />
              </g>
              <ellipse cx="112" cy="240" rx="16" ry="9" fill="#ff3d6e" opacity="0.55" /><ellipse cx="248" cy="240" rx="16" ry="9" fill="#ff3d6e" opacity="0.55" />
              <path class="gl {P}-ag-boca" d="M140 248 C156 274 204 274 220 248" stroke-width="9" />{gafas}
"""

def EMPLEADO(P, enojado=True):
    if enojado:
        cara = f"""
              <path class="l" d="M136 222 L168 232 M224 222 L192 232" stroke-width="7" />
              <circle cx="154" cy="248" r="7" fill="#fff1dc" /><circle cx="206" cy="248" r="7" fill="#fff1dc" />
              <path class="l {P}-boca" d="M154 300 C168 288 192 288 206 300" stroke-width="6" />
              <g class="{P}-brazos">
                <path class="y" d="M60 470 C120 430 240 430 300 470 L300 500 C240 466 120 466 60 500 Z" stroke-width="6" />
              </g>"""
    else:
        cara = f"""
              <path class="l" d="M138 218 C148 210 162 210 170 218 M190 218 C198 210 212 210 222 218" stroke-width="6" />
              <path class="l" d="M142 248 C150 240 160 240 166 248 M194 248 C200 240 210 240 218 248" stroke-width="6" />
              <path class="w {P}-boca" d="M152 284 C164 304 196 304 208 284 Z" stroke-width="5" />"""
    return f"""
              <path class="r" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" />
              <path class="y" d="M110 410 C140 396 220 396 250 410 L262 560 H98 Z" stroke-width="6" />
              <path class="l" d="M120 414 L150 382 M240 414 L210 382" stroke-width="5" />
              <path class="b" d="M154 306 V384 H206 V306" />
              <ellipse class="b" cx="180" cy="242" rx="68" ry="78" />
              <path class="r" d="M108 216 C104 160 140 138 182 138 C226 138 258 162 254 214 C228 196 196 192 180 192 C152 192 128 198 108 216 Z" />
              <path class="r" d="M112 196 C150 180 214 180 254 196 L290 200 C250 210 150 208 112 206 Z" stroke-width="5" />{cara}
"""

def CLIENTA(P):
    return f"""
              <path class="y" d="M30 560 C30 430 92 384 180 384 C268 384 330 430 330 560 Z" />
              <path class="k" d="M84 300 C60 200 96 132 180 130 C264 132 300 200 276 300 C262 330 240 330 232 310 L232 220 C200 200 160 200 128 220 L128 310 C120 330 98 330 84 300 Z" />
              <path class="b" d="M154 306 V388 H206 V306" />
              <ellipse class="b" cx="180" cy="246" rx="62" ry="76" />
              <path class="k" d="M118 226 C130 170 230 170 242 226 C214 204 146 204 118 226 Z" />
              <circle cx="156" cy="252" r="7" fill="#fff1dc" /><circle cx="204" cy="252" r="7" fill="#fff1dc" />
              <path class="w {P}-boca" d="M160 288 C170 300 190 300 200 288 Z" stroke-width="5" />
              <circle class="r" cx="118" cy="290" r="8" stroke-width="4" /><circle class="r" cx="242" cy="290" r="8" stroke-width="4" />
              <g class="{P}-cel">
                <path class="b" d="M300 470 C340 440 340 380 310 340" fill="none" />
                <rect class="b" x="276" y="250" width="70" height="120" rx="12" stroke-width="6" />
                <rect x="286" y="264" width="50" height="86" rx="6" fill="#ffb547" opacity="0.85" />
              </g>
"""

def DUENO(P):
    # el dueño de un local, delantal madera, bigote
    return f"""
              <path class="k" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" />
              <path class="m" d="M112 408 C142 396 218 396 248 408 L258 560 H102 Z" stroke-width="6" />
              <path class="b" d="M154 306 V384 H206 V306" />
              <ellipse class="b" cx="180" cy="240" rx="74" ry="80" />
              <path class="l" d="M114 200 C130 160 230 160 246 200" stroke-width="6" />
              <path class="w" d="M146 278 C160 266 176 270 180 278 C184 270 200 266 214 278 C200 290 160 290 146 278 Z" stroke-width="4" />
              <circle cx="154" cy="240" r="7" fill="#fff1dc" /><circle cx="206" cy="240" r="7" fill="#fff1dc" />
              <path class="l" d="M136 218 L168 220 M224 218 L192 220" stroke-width="6" />
              <path class="w {P}-boca" d="M164 300 C172 308 188 308 196 300 Z" stroke-width="4" />
"""

def ESCRITORIO(P, x=40, y=1180, w=600, h=300, taza=True):
    listones = "".join(f'<path d="M{x + 40 + k * ((w - 80) / 6):.0f} {y + 40} V{y + h - 20}" stroke="#fff1dc" stroke-width="4" opacity="0.25" />' for k in range(7))
    t = f"""
            <g class="{P}-taza">
              <path class="w" d="M{x + w - 150} {y - 110} H{x + w - 80} L{x + w - 86} {y - 18} H{x + w - 144} Z" stroke-width="6" />
              <path class="l" d="M{x + w - 82} {y - 92} C{x + w - 50} {y - 92} {x + w - 50} {y - 50} {x + w - 84} {y - 46}" stroke-width="6" />
              <text x="{x + w - 115}" y="{y - 52}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="46" fill="#ff3d6e">N</text>
              <path class="l {P}-vapor" d="M{x + w - 128} {y - 130} C{x + w - 140} {y - 150} {x + w - 116} {y - 160} {x + w - 128} {y - 184} M{x + w - 102} {y - 130} C{x + w - 114} {y - 150} {x + w - 90} {y - 160} {x + w - 102} {y - 184}" stroke-width="5" opacity="0.5" />
            </g>""" if taza else ""
    return f"""
          <g class="{P}-escritorio">
            <rect class="m" x="{x}" y="{y}" width="{w}" height="{h}" rx="14" />
            {listones}
            <rect class="y" x="{x - 18}" y="{y - 22}" width="{w + 36}" height="30" rx="10" />
            <g class="{P}-mic">
              <path class="l" d="M{x + 120} {y - 22} V{y - 70} L{x + 170} {y - 130}" stroke-width="6" />
              <rect class="b" x="{x + 158}" y="{y - 170}" width="36" height="58" rx="18" stroke-width="6" transform="rotate(40 {x + 176} {y - 140})" />
              <ellipse class="k" cx="{x + 120}" cy="{y - 22}" rx="40" ry="10" stroke-width="5" />
            </g>{t}
          </g>"""

def SILLON(P, x=560, y=1080, w=440, h=380):
    return f"""
          <g class="{P}-sillon">
            <path class="r" d="M{x + 30} {y + h * 0.55} C{x + 20} {y} {x + w - 20} {y} {x + w - 30} {y + h * 0.55} Z" />
            <path class="rl" d="M{x + 80} {y + 70} C{x + 160} {y + 40} {x + w - 160} {y + 40} {x + w - 80} {y + 70}" stroke="#fff1dc" stroke-width="4" opacity="0.4" />
            <rect class="r" x="{x + 40}" y="{y + h * 0.5}" width="{w - 80}" height="{h * 0.3}" rx="20" />
          </g>"""

def SILLON_BRAZOS(P, x=560, y=1080, w=440, h=380):
    return f"""
          <g class="{P}-sillon-b">
            <rect class="r" x="{x}" y="{y + h * 0.42}" width="90" height="{h * 0.5}" rx="40" />
            <rect class="r" x="{x + w - 90}" y="{y + h * 0.42}" width="90" height="{h * 0.5}" rx="40" />
            <rect class="r" x="{x + 40}" y="{y + h * 0.74}" width="{w - 80}" height="{h * 0.2}" rx="16" />
            <path class="l" d="M{x + 70} {y + h * 0.94} V{y + h + 14} M{x + w - 70} {y + h * 0.94} V{y + h + 14}" stroke-width="8" />
          </g>"""

def BATERIA(P, cx=540, cy=1260):
    return f"""
          <g class="{P}-bateria">
            <g class="{P}-baterista">
              <path class="k" d="M{cx - 120} {cy - 40} C{cx - 120} {cy - 150} {cx - 60} {cy - 190} {cx} {cy - 190} C{cx + 60} {cy - 190} {cx + 120} {cy - 150} {cx + 120} {cy - 40} Z" />
              <ellipse class="b" cx="{cx}" cy="{cy - 270}" rx="56" ry="64" />
              <path class="k" d="M{cx - 60} {cy - 290} C{cx - 60} {cy - 350} {cx + 60} {cy - 350} {cx + 60} {cy - 290} C{cx + 30} {cy - 310} {cx - 30} {cy - 310} {cx - 60} {cy - 290} Z" />
              <path class="l" d="M{cx - 30} {cy - 270} H{cx - 10} M{cx + 10} {cy - 270} H{cx + 30}" stroke-width="7" />
              <path class="w" d="M{cx - 22} {cy - 236} C{cx - 10} {cy - 220} {cx + 10} {cy - 220} {cx + 22} {cy - 236} Z" stroke-width="4" />
              <g class="{P}-palo-i"><path class="l" d="M{cx - 100} {cy - 120} L{cx - 200} {cy - 40}" stroke-width="7" /><path class="yl" d="M{cx - 190} {cy - 50} L{cx - 250} {cy}" stroke-width="7" /></g>
              <g class="{P}-palo-d"><path class="l" d="M{cx + 100} {cy - 120} L{cx + 190} {cy - 120}" stroke-width="7" /><path class="yl" d="M{cx + 180} {cy - 120} L{cx + 250} {cy - 150}" stroke-width="7" /></g>
            </g>
            <g class="{P}-platillo"><path class="l" d="M{cx + 280} {cy - 140} V{cy + 200}" stroke-width="6" /><ellipse class="y" cx="{cx + 280}" cy="{cy - 150}" rx="120" ry="22" stroke-width="5" /></g>
            <g class="{P}-redo"><ellipse class="k" cx="{cx - 250}" cy="{cy + 20}" rx="100" ry="30" stroke-width="6" /><path class="k" d="M{cx - 350} {cy + 20} V{cy + 90} C{cx - 350} {cy + 130} {cx - 150} {cy + 130} {cx - 150} {cy + 90} V{cy + 20}" stroke-width="6" /><path class="l" d="M{cx - 250} {cy + 120} V{cy + 200}" stroke-width="6" /></g>
            <circle class="b" cx="{cx}" cy="{cy + 80}" r="150" />
            <circle cx="{cx}" cy="{cy + 80}" r="112" fill="none" stroke="#ff3d6e" stroke-width="6" />
            <text x="{cx}" y="{cy + 104}" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="74" fill="#ff3d6e">NdN</text>
          </g>"""

def PUBLICO(P, y=1300, filas=3, n=7):
    out = ""
    for f in range(filas):
        yy = y + f * 110
        for k in range(n + (f % 2)):
            x = 60 + k * (960 / (n - 1 + (f % 2))) - (f % 2) * 30
            out += f'<g class="{P}-cab {P}-fila{f} {P}-c{(k + f) % 3}"><path class="k" d="M{x - 70:.0f} {yy + 130} C{x - 70:.0f} {yy + 50} {x - 40:.0f} {yy + 30} {x:.0f} {yy + 30} C{x + 40:.0f} {yy + 30} {x + 70:.0f} {yy + 50} {x + 70:.0f} {yy + 130} Z" stroke-width="5" /><circle class="b" cx="{x:.0f}" cy="{yy - 20}" r="40" stroke-width="5" /></g>'
    return f'<g class="{P}-publico">{out}</g>'

def HAZ(P, clase, x_top, x_bot, ancho_top=40, ancho_bot=420, y_top=520, y_bot=1500, color="#fff1dc"):
    return f"""<path class="{P}-haz {clase}" fill="{color}" opacity="0.09" d="M{x_top - ancho_top / 2} {y_top} L{x_top + ancho_top / 2} {y_top} L{x_bot + ancho_bot / 2} {y_bot} L{x_bot - ancho_bot / 2} {y_bot} Z" />"""

def CELULAR(P, x, y, w=420, h=820):
    return f"""
          <g class="{P}-celu">
            <rect class="b" x="{x}" y="{y}" width="{w}" height="{h}" rx="52" stroke-width="8" />
            <rect x="{x + w / 2 - 50}" y="{y + 22}" width="100" height="14" rx="7" fill="#fff1dc" opacity="0.6" />
            <rect x="{x + 22}" y="{y + 60}" width="{w - 44}" height="70" rx="14" fill="#1c2a5e" />
          </g>"""

def GLOBO(P, clase, x, y, w, texto, lado="izq", fondo="#fff1dc", tinta="#0b1330", fs=38):
    return f"""<div class="{P}-globo {clase}" style="position:absolute;left:{x}px;top:{y}px;width:{w}px;padding:18px 24px 16px;background:{fondo};color:{tinta};border-radius:26px;border-{'bottom-left' if lado == 'izq' else 'bottom-right'}-radius:6px;font-family:'Lexend',sans-serif;font-weight:700;font-size:{fs}px;line-height:1.14;">{texto}</div>"""

def CARTEL(P, clase, x, y, texto, color="#ff3d6e", fs=60, rot=0):
    # cartel de neón con letra manuscrita
    return f"""<div class="{P}-neon {clase}" style="position:absolute;left:{x}px;top:{y}px;transform:rotate({rot}deg);font-family:'Caveat',cursive;font-weight:700;font-size:{fs}px;line-height:1;color:#fff1dc;white-space:nowrap;text-shadow:0 0 6px {color},0 0 18px {color},0 0 38px {color};">{texto}</div>"""
