# Piezas compartidas por las escenas de la-sitcom (personajes y muebles del living de "Dos en el
# Local"). Los personajes están en coordenadas locales (~360 x 560, cabeza arriba, pies abajo):
# ponelos dentro de un <g transform="translate(x y) scale(s)">. Clases con prefijo P.
# Paleta: contorno/noche #24122f, violeta #5b2a86/#8a4cc2, naranja quemado #d4581f,
# turquesa #1fb5a8, mostaza #f0b429, crema #fff4e0, verde #5ce611 (solo el agente de IA y Scalerics).

def _cara_dueno(P, cara):
    if cara == "susto":
        return f"""
              <circle class="c" cx="150" cy="236" r="22" stroke-width="6" /><circle class="c" cx="210" cy="236" r="22" stroke-width="6" />
              <circle cx="150" cy="238" r="8" fill="#24122f" /><circle cx="210" cy="238" r="8" fill="#24122f" />
              <path class="l" d="M122 196 L168 188 M192 188 L238 196" stroke-width="7" />
              <ellipse class="b {P}-boca" cx="180" cy="290" rx="20" ry="26" />"""
    if cara == "feliz":
        return f"""
              <path class="l" d="M134 236 C142 222 160 222 168 236 M192 236 C200 222 218 222 226 236" stroke-width="7" />
              <path class="l" d="M132 206 C142 198 158 198 168 204 M192 204 C202 198 218 198 228 206" stroke-width="6" />
              <path class="b {P}-boca" d="M146 270 C156 306 204 306 214 270 Z" />"""
    if cara == "sospecha":
        return f"""
              <path class="l" d="M134 238 H166 M194 238 H226" stroke-width="8" />
              <path class="l" d="M130 216 L168 222 M192 208 C206 194 222 194 234 202" stroke-width="7" />
              <path class="l {P}-boca" d="M162 288 C176 282 194 280 208 276" stroke-width="7" />"""
    if cara == "emocion":
        return f"""
              <circle cx="150" cy="238" r="14" fill="#24122f" /><circle cx="210" cy="238" r="14" fill="#24122f" />
              <circle cx="155" cy="232" r="5" fill="#fff4e0" /><circle cx="215" cy="232" r="5" fill="#fff4e0" />
              <path class="l" d="M130 214 C140 204 156 202 168 208 M192 208 C204 202 220 204 230 214" stroke-width="6" />
              <path class="t {P}-lagrima" d="M226 254 C232 270 238 280 230 290 C222 296 212 288 216 276 Z" stroke-width="4" />
              <path class="b {P}-boca" d="M150 276 C160 300 200 300 210 276 C196 284 164 284 150 276 Z" />"""
    # cansado (por defecto): ojos a media asta, ojeras
    return f"""
              <path class="c" d="M134 232 C140 222 162 222 168 232 C162 246 140 246 134 232 Z" stroke-width="6" />
              <path class="c" d="M192 232 C198 222 220 222 226 232 C220 246 198 246 192 232 Z" stroke-width="6" />
              <path d="M134 232 H168 M192 232 H226" stroke="#24122f" stroke-width="9" stroke-linecap="round" />
              <circle cx="151" cy="238" r="5" fill="#24122f" /><circle cx="209" cy="238" r="5" fill="#24122f" />
              <path d="M138 254 C146 260 158 260 166 254 M194 254 C202 260 214 260 222 254" stroke="#8a4cc2" stroke-width="5" fill="none" stroke-linecap="round" />
              <path class="l {P}-boca" d="M164 292 C174 288 188 288 198 292" stroke-width="7" />"""

def DUENO(P, cara="cansado", brazos="abajo", taza=False, chancleta=False):
    """El dueño de la tienda: pijama turquesa a rayas mostaza, pelo revuelto, barba de dos días."""
    if brazos == "arriba":
        br = f"""
              <g class="{P}-du-bi"><path class="t" d="M64 430 C30 380 24 320 40 270 L74 280 C64 324 74 370 98 410 Z" stroke-width="6" /><circle class="c" cx="56" cy="262" r="22" stroke-width="6" /></g>
              <g class="{P}-du-bd"><path class="t" d="M296 430 C330 380 336 320 320 270 L286 280 C296 324 286 370 262 410 Z" stroke-width="6" /><circle class="c" cx="304" cy="262" r="22" stroke-width="6" />""" + (f"""
                <g class="{P}-chancleta"><path class="o" d="M282 150 C270 190 290 250 320 250 C346 250 352 196 336 150 C326 122 292 122 282 150 Z" stroke-width="6" /><path class="l" d="M290 190 C306 176 324 176 340 190" stroke-width="6" /></g>""" if chancleta else "") + "</g>"
    elif brazos == "abrazo":
        br = f"""
              <g class="{P}-du-bd"><path class="t" d="M300 430 C356 420 400 400 420 360 L392 340 C372 376 340 392 290 398 Z" stroke-width="6" /><circle class="c" cx="414" cy="344" r="22" stroke-width="6" /></g>"""
    else:
        tz = f"""
                <g class="{P}-taza"><path class="y" d="M262 420 H322 L316 500 H268 Z" stroke-width="6" /><path class="l" d="M322 440 C346 440 346 476 320 478" stroke-width="6" />
                <path class="l {P}-vapor" d="M280 404 C270 388 292 380 282 362 M302 404 C292 388 314 380 304 362" stroke-width="5" opacity="0.6" /></g>""" if taza else ""
        br = f"""
              <g class="{P}-du-bi"><path class="t" d="M58 450 C40 500 44 530 60 556 L92 548 C80 520 80 494 96 460 Z" stroke-width="6" /></g>
              <g class="{P}-du-bd"><path class="t" d="M300 440 C312 470 300 480 276 476 L268 450 C280 452 284 448 280 430 Z" stroke-width="6" /><circle class="c" cx="276" cy="466" r="20" stroke-width="6" />{tz}</g>"""
    return f"""
              <path class="t" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" />
              <path d="M110 420 V556 M150 396 V556 M210 396 V556 M250 420 V556" stroke="#f0b429" stroke-width="10" opacity="0.9" />
              <path class="t" d="M30 560 C30 430 92 380 180 380 C268 380 330 430 330 560 Z" fill="none" />
              <path class="c" d="M140 384 L180 440 L220 384" stroke-width="6" />
              <circle cx="180" cy="474" r="7" fill="#24122f" /><circle cx="180" cy="512" r="7" fill="#24122f" />
              <path class="c" d="M154 300 V386 H206 V300" />
              <ellipse class="c" cx="104" cy="242" rx="14" ry="22" stroke-width="6" /><ellipse class="c" cx="256" cy="242" rx="14" ry="22" stroke-width="6" />
              <ellipse class="c" cx="180" cy="236" rx="76" ry="84" />
              <g class="{P}-pelo"><path class="b" d="M104 214 C84 170 100 128 126 140 C122 108 150 92 170 116 C176 82 214 86 214 118 C236 96 270 120 254 150 C276 156 274 196 258 214 C246 184 226 168 196 170 C166 158 128 170 104 214 Z" /></g>
              <path d="M128 296 C150 330 210 330 232 296" stroke="#24122f" stroke-width="3" stroke-dasharray="2 10" fill="none" stroke-linecap="round" opacity="0.6" />{_cara_dueno(P, cara)}{br}
"""

def AGENTE(P, cara="feliz", gorra=True, brazo="abajo"):
    """El agente de IA: un celular con cara (ojos y sonrisa verdes en la pantalla), guantes, zapatillas
    naranja y gorra mostaza para atrás. ~360 x 560."""
    if cara == "guino":
        ojos = f"""<g class="{P}-ag-ojos"><path class="gl" d="M122 220 C132 206 152 206 162 220" stroke-width="10" /><rect x="198" y="196" width="34" height="50" rx="17" fill="#5ce611" /></g>"""
    elif cara == "tranqui":
        ojos = f"""<g class="{P}-ag-ojos"><path class="gl" d="M120 222 C130 210 152 210 162 222 M198 222 C208 210 230 210 240 222" stroke-width="10" /></g>"""
    elif cara == "serio":
        ojos = f"""<g class="{P}-ag-ojos"><rect x="126" y="200" width="34" height="40" rx="14" fill="#5ce611" /><rect x="200" y="200" width="34" height="40" rx="14" fill="#5ce611" /><path class="gl" d="M120 186 H164 M196 186 H240" stroke-width="7" /></g>"""
    else:
        ojos = f"""<g class="{P}-ag-ojos"><rect x="126" y="192" width="34" height="52" rx="17" fill="#5ce611" /><rect x="200" y="192" width="34" height="52" rx="17" fill="#5ce611" /></g>"""
    boca = f'<path class="gl {P}-ag-boca" d="M140 276 C156 304 204 304 220 276" stroke-width="10" />' if cara != "serio" else f'<path class="gl {P}-ag-boca" d="M150 286 H210" stroke-width="10" />'
    gor = f"""
              <g class="{P}-ag-gorra"><path class="y" d="M92 128 C96 70 264 70 268 128 Z" stroke-width="6" /><path class="y" d="M92 126 C70 128 52 120 44 108 L94 104 Z" stroke-width="6" /><circle class="o" cx="180" cy="80" r="10" stroke-width="5" /></g>""" if gorra else ""
    if brazo == "saluda":
        bd = f"""<g class="{P}-ag-bd"><path class="l" d="M290 300 C330 280 340 230 330 190" stroke-width="10" /><circle class="c" cx="330" cy="178" r="24" stroke-width="6" /></g>"""
    elif brazo == "pulgar":
        bd = f"""<g class="{P}-ag-bd"><path class="l" d="M290 310 C326 300 344 270 346 236" stroke-width="10" /><rect class="c" x="322" y="214" width="46" height="40" rx="14" stroke-width="6" /><rect class="c" x="334" y="176" width="20" height="44" rx="10" stroke-width="6" /></g>"""
    elif brazo == "da":
        bd = f"""<g class="{P}-ag-bd"><path class="l" d="M290 320 C340 320 380 310 410 300" stroke-width="10" /><circle class="c" cx="418" cy="298" r="24" stroke-width="6" /></g>"""
    else:
        bd = f"""<g class="{P}-ag-bd"><path class="l" d="M290 310 C318 340 320 380 304 410" stroke-width="10" /><circle class="c" cx="302" cy="420" r="22" stroke-width="6" /></g>"""
    return f"""
              <g class="{P}-ag-pies"><path class="l" d="M140 470 V530 M220 470 V530" stroke-width="10" />
              <path class="o" d="M104 548 C104 526 122 520 148 522 C160 524 160 548 152 552 H112 Z" stroke-width="6" />
              <path class="o" d="M212 552 C204 548 204 524 216 522 C242 520 260 526 260 548 L252 552 Z" stroke-width="6" /></g>
              <g class="{P}-ag-bi"><path class="l" d="M70 310 C42 340 40 380 56 410" stroke-width="10" /><circle class="c" cx="58" cy="420" r="22" stroke-width="6" /></g>
              {bd}
              <rect class="b" x="66" y="108" width="228" height="372" rx="46" />
              <rect class="ag {P}-ag-pantalla" x="84" y="140" width="192" height="306" rx="30" stroke-width="5" />
              <rect x="150" y="120" width="60" height="10" rx="5" fill="#8a4cc2" />
              <ellipse cx="124" cy="270" rx="16" ry="9" fill="#d4581f" opacity="0.8" /><ellipse cx="236" cy="270" rx="16" ry="9" fill="#d4581f" opacity="0.8" />
              {ojos}
              {boca}
              <rect x="150" y="414" width="60" height="8" rx="4" fill="#5ce611" opacity="0.6" />{gor}
"""

def SOFI(P):
    """La clienta joven, en la cama con el celular (de la cintura para arriba)."""
    return f"""
              <path class="v" d="M84 310 C56 200 96 128 180 126 C264 128 304 200 276 310 C262 360 236 350 232 320 L232 220 C200 200 160 200 128 220 L128 320 C124 350 98 360 84 310 Z" />
              <path class="y" d="M30 560 C30 430 92 384 180 384 C268 384 330 430 330 560 Z" />
              <path class="c" d="M154 306 V388 H206 V306" />
              <ellipse class="c" cx="180" cy="246" rx="62" ry="76" />
              <path class="v" d="M118 226 C130 160 230 160 242 226 C214 200 146 200 118 226 Z" />
              <circle cx="156" cy="250" r="9" fill="#24122f" /><circle cx="204" cy="250" r="9" fill="#24122f" />
              <path class="l" d="M140 226 L168 230 M192 230 L220 226" stroke-width="5" />
              <ellipse class="b {P}-boca" cx="180" cy="294" rx="12" ry="14" />
              <circle cx="128" cy="276" r="9" fill="#d4581f" opacity="0.7" /><circle cx="232" cy="276" r="9" fill="#d4581f" opacity="0.7" />
              <g class="{P}-cel">
                <path class="l" d="M270 520 C320 480 320 420 300 380" stroke-width="12" />
                <rect class="b" x="262" y="270" width="80" height="130" rx="14" stroke-width="6" />
                <rect x="272" y="284" width="60" height="96" rx="8" fill="#5ce611" opacity="0.9" />
              </g>
"""

def GRACIELA(P):
    """La profe del colegio, solo la cabeza (para el avatar del audio). ~ 200 x 200, centro 100 100."""
    return f"""
              <circle class="t" cx="100" cy="100" r="96" stroke-width="6" />
              <circle class="b" cx="100" cy="40" r="28" />
              <path class="b" d="M44 120 C34 60 70 34 100 34 C130 34 166 60 156 120 Z" />
              <ellipse class="c" cx="100" cy="106" rx="44" ry="52" stroke-width="6" />
              <circle class="c" cx="82" cy="102" r="14" stroke-width="5" /><circle class="c" cx="118" cy="102" r="14" stroke-width="5" />
              <path class="l" d="M96 102 H104" stroke-width="5" />
              <circle cx="82" cy="104" r="5" fill="#24122f" /><circle cx="118" cy="104" r="5" fill="#24122f" />
              <path class="l" d="M86 132 C94 140 106 140 114 132" stroke-width="5" />
              <path class="o" d="M40 196 C46 162 70 150 100 150 C130 150 154 162 160 196 Z" stroke-width="5" />
"""

def SILLON(P, x=80, y=1160, w=920, h=330):
    """Sillón naranja quemado de tres cuerpos con almohadones turquesa."""
    cw = (w - 160) / 3
    cojines = "".join(f'<rect class="o" x="{x + 80 + k * cw:.0f}" y="{y + h * 0.52:.0f}" width="{cw:.0f}" height="{h * 0.22:.0f}" rx="16" />' for k in range(3))
    return f"""
          <g class="{P}-sillon">
            <path class="o" d="M{x + 40} {y + h * 0.6} C{x + 30} {y + 10} {x + w - 30} {y + 10} {x + w - 40} {y + h * 0.6} Z" />
            <path d="M{x + 120} {y + 70} C{x + w * 0.35} {y + 44} {x + w * 0.65} {y + 44} {x + w - 120} {y + 70}" stroke="#fff4e0" stroke-width="5" opacity="0.35" fill="none" stroke-linecap="round" />
            {cojines}
            <rect class="o" x="{x}" y="{y + h * 0.36}" width="110" height="{h * 0.56}" rx="46" />
            <rect class="o" x="{x + w - 110}" y="{y + h * 0.36}" width="110" height="{h * 0.56}" rx="46" />
            <rect class="o" x="{x + 60}" y="{y + h * 0.72}" width="{w - 120}" height="{h * 0.2}" rx="16" />
            <path class="l" d="M{x + 90} {y + h * 0.92} V{y + h + 16} M{x + w - 90} {y + h * 0.92} V{y + h + 16}" stroke-width="10" />
            <rect class="t" x="{x + 150}" y="{y + h * 0.3}" width="120" height="110" rx="26" transform="rotate(-12 {x + 210} {y + h * 0.3 + 55})" />
            <rect class="y" x="{x + w - 280}" y="{y + h * 0.3}" width="120" height="110" rx="26" transform="rotate(10 {x + w - 220} {y + h * 0.3 + 55})" />
          </g>"""

def LAMPARA(P, x=930, y=760, alto=720):
    return f"""
          <g class="{P}-lampara">
            <path class="l" d="M{x} {y + 120} V{y + alto}" stroke-width="10" />
            <ellipse class="b" cx="{x}" cy="{y + alto}" rx="60" ry="14" />
            <path class="y" d="M{x - 70} {y + 130} L{x - 40} {y} H{x + 40} L{x + 70} {y + 130} Z" />
            <path d="M{x - 60} {y + 112} H{x + 60}" stroke="#d4581f" stroke-width="8" />
          </g>"""

def PUERTA(P, x=640, y=700, w=300, h=800, abierta=0):
    return f"""
          <g class="{P}-puerta">
            <rect class="b" x="{x - 18}" y="{y - 18}" width="{w + 36}" height="{h + 18}" rx="10" />
            <g class="{P}-hoja"><rect class="t" x="{x}" y="{y}" width="{w}" height="{h}" rx="6" />
            <rect x="{x + 40}" y="{y + 50}" width="{w - 80}" height="{h * 0.36}" rx="10" fill="none" stroke="#24122f" stroke-width="5" opacity="0.5" />
            <rect x="{x + 40}" y="{y + h * 0.5}" width="{w - 80}" height="{h * 0.4}" rx="10" fill="none" stroke="#24122f" stroke-width="5" opacity="0.5" />
            <circle class="y" cx="{x + w - 40}" cy="{y + h * 0.5}" r="16" stroke-width="5" /></g>
          </g>"""

def VENTANA(P, x=120, y=640, w=360, h=420, noche=True):
    cielo = "#24122f" if noche else "#1fb5a8"
    astro = (f'<circle cx="{x + w * 0.68}" cy="{y + h * 0.3}" r="40" fill="#fff4e0" /><circle cx="{x + w * 0.68 + 18}" cy="{y + h * 0.3 - 10}" r="36" fill="{cielo}" />'
             + "".join(f'<circle cx="{x + w * a}" cy="{y + h * b}" r="4" fill="#fff4e0" opacity="0.8" />' for a, b in [(0.2, 0.2), (0.35, 0.45), (0.15, 0.6), (0.5, 0.15), (0.8, 0.65)])) if noche else \
            f'<circle class="y" cx="{x + w * 0.68}" cy="{y + h * 0.32}" r="48" stroke-width="6" />'
    return f"""
          <g class="{P}-ventana">
            <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{cielo}" />
            {astro}
            <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" stroke="#24122f" stroke-width="16" rx="6" />
            <path d="M{x + w / 2} {y} V{y + h} M{x} {y + h / 2} H{x + w}" stroke="#24122f" stroke-width="10" />
            <path class="o" d="M{x - 30} {y - 20} H{x + w * 0.3} C{x + w * 0.2} {y + h * 0.4} {x + w * 0.1} {y + h * 0.8} {x - 10} {y + h + 30} H{x - 30} Z" stroke-width="6" />
            <path class="o" d="M{x + w + 30} {y - 20} H{x + w * 0.7} C{x + w * 0.8} {y + h * 0.4} {x + w * 0.9} {y + h * 0.8} {x + w + 10} {y + h + 30} H{x + w + 30} Z" stroke-width="6" />
            <rect class="y" x="{x - 50}" y="{y - 40}" width="{w + 100}" height="24" rx="10" stroke-width="6" />
          </g>"""

def RELOJ(P, clase, x, y, texto="3:00", r=0):
    return f"""<div class="{P}-reloj {clase}" style="position:absolute;left:{x}px;top:{y}px;transform:rotate({r}deg);padding:14px 26px 10px;background:#24122f;border:7px solid #f0b429;border-radius:20px;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:76px;line-height:1;color:#d4581f;letter-spacing:0.04em;text-shadow:0 0 18px rgba(212,88,31,0.8);">{texto}<span style="font-size:34px;margin-left:10px;color:#f0b429;">AM</span></div>"""

def NOCHE(P, op=0.55):
    """Velo de noche sobre el living del fondo."""
    return f'<rect class="{P}-noche" x="0" y="0" width="1080" height="1920" fill="#0f0820" opacity="{op}" />'

def GLOBO(P, clase, x, y, w, texto, lado="izq", fondo="#fff4e0", tinta="#24122f", fs=40, borde="#24122f"):
    return f"""<div class="{P}-globo {clase}" style="position:absolute;left:{x}px;top:{y}px;width:{w}px;padding:20px 26px 18px;background:{fondo};color:{tinta};border:6px solid {borde};border-radius:30px;border-{'bottom-left' if lado == 'izq' else 'bottom-right'}-radius:6px;box-shadow:0 8px 0 #24122f;font-family:'Lexend',sans-serif;font-weight:700;font-size:{fs}px;line-height:1.16;">{texto}</div>"""

def CARTEL(P, clase, x, y, texto, fondo="#f0b429", tinta="#24122f", fs=60, rot=0):
    return f"""<div class="cartela {P}-cartel {clase}" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);background:{fondo};color:{tinta};font-size:{fs}px;">{texto}</div>"""

def CHECK(P, clase, x, y, s=1, color="#5ce611"):
    return f'<path class="{P}-check {clase}" d="M{x} {y + 20 * s} L{x + 22 * s} {y + 42 * s} L{x + 60 * s} {y}" fill="none" stroke="{color}" stroke-width="{12 * s}" stroke-linecap="round" stroke-linejoin="round" />'

def CORAZON(P, clase, x, y, s=1, fill="#d4581f"):
    return f'<path class="{P}-cor {clase}" transform="translate({x} {y}) scale({s})" d="M0 -10 C-10 -36 -50 -36 -50 -4 C-50 22 -18 40 0 58 C18 40 50 22 50 -4 C50 -36 10 -36 0 -10 Z" fill="{fill}" stroke="#24122f" stroke-width="6" stroke-linejoin="round" />'
