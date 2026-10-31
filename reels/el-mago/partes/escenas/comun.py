# Piezas compartidas por las escenas de el-mago (personajes, galera, cartas, caja con sierra,
# destellos, humo, reflector, celular). Los personajes están en coordenadas locales (~360 x 560,
# cabeza arriba con centro en 180 236, torso abajo): ponelos dentro de un
# <g transform="translate(x y) scale(s)">. Las clases llevan el prefijo P de la escena.
# Paleta: negro #0a0610, violeta #2b1250, lila #c3a2ff, plateado #e6e8f0, rosa #ff4fa3,
# cian #45dcf0 (el celular del dueño) y, desde el giro, verde Scalerics #5ce611.

def MAGO(P, varita=True):
    var = f"""
              <g class="{P}-brazo">
                <path class="b" d="M276 418 C318 400 342 352 332 300 L304 296 C312 340 298 378 258 396 Z" />
                <g class="{P}-varita">
                  <path d="M318 292 L404 162" stroke="#e6e8f0" stroke-width="20" stroke-linecap="round" />
                  <path d="M318 292 L404 162" stroke="#0a0610" stroke-width="9" stroke-linecap="round" />
                  <path d="M392 180 L404 162" stroke="#e6e8f0" stroke-width="12" stroke-linecap="round" />
                </g>
                <circle class="s" cx="318" cy="294" r="22" />
              </g>""" if varita else f"""
              <g class="{P}-brazo">
                <path class="b" d="M276 418 C312 430 330 470 326 520 L298 520 C300 480 288 456 258 444 Z" />
                <circle class="s" cx="312" cy="526" r="22" />
              </g>"""
    return f"""
              <path class="k" d="M6 560 C24 460 58 392 110 372 L250 372 C302 392 336 460 354 560 Z" />
              <path class="pl" d="M30 556 C44 470 72 410 112 384 M330 556 C316 470 288 410 248 384" stroke-width="6" opacity="0.8" />
              <path class="b" d="M60 560 C60 430 110 380 180 380 C250 380 300 430 300 560 Z" />
              <path class="s" d="M144 384 L180 486 L216 384 Z" stroke-width="5" />
              <path class="l" d="M134 388 L172 520 M226 388 L188 520" stroke-width="5" opacity="0.7" />
              <path class="p" d="M148 394 L180 408 L212 394 L212 424 L180 410 L148 424 Z" stroke-width="5" />
              <path class="b" d="M156 300 V386 H204 V300" />
              <ellipse class="b" cx="180" cy="236" rx="66" ry="78" />
              <circle cx="156" cy="234" r="8" fill="#e6e8f0" /><circle cx="204" cy="234" r="8" fill="#e6e8f0" />
              <path class="l {P}-ceja" d="M134 212 C144 198 162 198 170 208 M190 208 C198 198 216 198 226 212" stroke-width="6" />
              <path class="l {P}-boca" d="M166 298 C174 306 186 306 194 298" stroke-width="6" />
              <path class="l" d="M180 274 C168 264 146 266 134 280 C126 290 114 286 118 274 M180 274 C192 264 214 266 226 280 C234 290 246 286 242 274" stroke-width="8" />
              <path class="l" d="M180 246 L172 262 H184" stroke-width="5" opacity="0.6" />
              <g class="{P}-galera">
                <path class="b" d="M122 172 L128 36 L232 36 L238 172 Z" />
                <path class="p" d="M124 132 L236 132 L238 166 L122 166 Z" stroke-width="5" />
                <path class="b" d="M84 172 C84 156 276 156 276 172 C276 190 84 190 84 172 Z" />
                <path class="l" d="M140 50 L136 120" stroke-width="5" opacity="0.5" />
              </g>{var}
"""

def ASISTENTE(P, brazo=True):
    br = f"""
              <g class="{P}-brazo">
                <path class="b" d="M268 420 C318 410 350 380 370 338 L394 350 C374 398 332 432 280 448 Z" />
                <circle class="b" cx="384" cy="338" r="20" />
              </g>""" if brazo else ""
    return f"""
              <path class="k" d="M98 250 C84 150 136 124 180 124 C230 124 280 152 264 250 C262 290 256 318 246 340 L116 340 C104 318 100 290 98 250 Z" />
              <path class="v" d="M56 560 C66 444 110 392 180 392 C250 392 294 444 304 560 Z" />
              <g fill="#e6e8f0">
                <circle cx="120" cy="470" r="5" /><circle cx="160" cy="440" r="5" /><circle cx="210" cy="460" r="5" /><circle cx="250" cy="430" r="5" />
                <circle cx="100" cy="530" r="5" /><circle cx="150" cy="510" r="5" /><circle cx="200" cy="530" r="5" /><circle cx="250" cy="500" r="5" /><circle cx="280" cy="540" r="5" />
              </g>
              <path class="b" d="M158 310 V396 H202 V310" />
              <path class="l" d="M140 396 C150 420 210 420 220 396" stroke-width="5" />
              <ellipse class="b" cx="180" cy="242" rx="62" ry="74" />
              <path class="k" d="M118 222 C126 164 234 164 242 222 C222 200 196 194 176 204 C156 194 132 202 118 222 Z" />
              <path class="pl" d="M120 192 C150 170 210 170 240 192" stroke-width="6" />
              <path class="p" d="M214 178 C226 128 262 104 296 76 C292 126 262 160 226 184 Z" stroke-width="5" />
              <circle cx="156" cy="246" r="8" fill="#e6e8f0" /><circle cx="204" cy="246" r="8" fill="#e6e8f0" />
              <path class="l" d="M142 234 L136 226 M150 230 L148 222 M218 234 L224 226 M210 230 L212 222" stroke-width="4" />
              <path class="s {P}-boca" d="M154 284 C164 306 196 306 206 284 Z" stroke-width="5" />
              <circle class="p" cx="118" cy="276" r="8" stroke-width="4" /><circle class="p" cx="242" cy="276" r="8" stroke-width="4" />{br}
"""

def DUENO(P, telefono=True):
    tel = f"""
              <g class="{P}-brazo">
                <path class="c" d="M300 470 C350 440 360 380 330 330 L300 340 C318 380 310 420 270 440 Z" />
                <rect class="b" x="296" y="226" width="74" height="128" rx="14" transform="rotate(12 333 290)" />
                <rect class="{P}-pantalla" x="308" y="242" width="50" height="86" rx="6" fill="#45dcf0" opacity="0.9" transform="rotate(12 333 290)" />
              </g>""" if telefono else ""
    return f"""
              <path class="c" d="M30 560 C30 420 92 368 180 368 C268 368 330 420 330 560 Z" />
              <path class="k" d="M104 430 L256 430 L268 560 L92 560 Z" stroke-width="6" />
              <path class="l" d="M104 430 L132 378 M256 430 L228 378" stroke-width="5" />
              <path class="l" d="M140 476 H220" stroke-width="5" opacity="0.6" />
              <path class="b" d="M152 300 V380 H208 V300" />
              <ellipse class="b" cx="180" cy="236" rx="74" ry="82" />
              <path class="l" d="M108 252 C100 224 104 198 116 182 M252 252 C260 224 256 198 244 182" stroke-width="9" />
              <path class="l" d="M150 172 C164 164 184 162 200 166" stroke-width="5" opacity="0.5" />
              <g class="{P}-lentes"><circle cx="152" cy="190" r="18" fill="none" stroke="#45dcf0" stroke-width="5" /><circle cx="208" cy="190" r="18" fill="none" stroke="#45dcf0" stroke-width="5" /><path d="M170 190 H190" stroke="#45dcf0" stroke-width="5" /></g>
              <g class="{P}-ojos">
                <path class="l" d="M140 244 H168 M194 244 H222" stroke-width="6" />
                <path d="M146 246 a8 6 0 0 0 16 0 Z M200 246 a8 6 0 0 0 16 0 Z" fill="#e6e8f0" />
                <path class="l" d="M142 262 C150 268 160 268 166 262 M196 262 C204 268 214 268 220 262" stroke-width="4" opacity="0.55" />
              </g>
              <path class="l" d="M134 226 L166 232 M228 226 L196 232" stroke-width="5" />
              <path class="l {P}-boca" d="M160 296 C172 290 190 290 202 296" stroke-width="6" />{tel}
"""

def GALERA(P, clase, x, y, s=1.0):
    """Galera vista de costado y un poco de arriba (boca hacia arriba). (x, y) = centro de la boca."""
    return f"""
          <g class="{P}-gal {clase}"><g transform="translate({x} {y}) scale({s})">
            <path class="b" d="M-140 230 C-140 200 140 200 140 230 C140 262 -140 262 -140 230 Z" />
            <path class="b" d="M-104 0 L-96 226 L96 226 L104 0 Z" />
            <path class="p" d="M-98 170 L98 170 L96 220 L-96 220 Z" stroke-width="6" />
            <ellipse class="k" cx="0" cy="0" rx="104" ry="30" />
            <ellipse cx="0" cy="4" rx="84" ry="20" fill="#0a0610" />
            <path class="l" d="M-70 30 L-66 150" stroke-width="5" opacity="0.5" />
          </g></g>"""

def CARTA(P, clase, x, y, rot=0, s=1.0, letra="A", palo="corazon"):
    simb = {
        "corazon": "M0 18 C-30 -6 -26 -34 -8 -34 C0 -34 0 -26 0 -22 C0 -26 0 -34 8 -34 C26 -34 30 -6 0 18 Z",
        "diamante": "M0 -36 L26 0 L0 36 L-26 0 Z",
        "pica": "M0 -36 C-30 -6 -30 16 -10 16 C-4 16 -2 12 0 8 L-8 30 H8 L0 8 C2 12 4 16 10 16 C30 16 30 -6 0 -36 Z",
    }[palo]
    col = "#ff4fa3" if palo in ("corazon", "diamante") else "#0a0610"
    return f"""
          <g class="{P}-carta {clase}"><g transform="translate({x} {y}) rotate({rot}) scale({s})">
            <rect class="s" x="-75" y="-105" width="150" height="210" rx="14" stroke="#0a0610" stroke-width="5" />
            <rect x="-62" y="-92" width="124" height="184" rx="8" fill="none" stroke="{col}" stroke-width="3" opacity="0.5" />
            <path d="{simb}" fill="{col}" transform="scale(1.3)" />
            <text x="-52" y="-58" font-family="Lexend" font-weight="900" font-size="34" fill="{col}">{letra}</text>
          </g></g>"""

def ESTRELLA(P, clase, x, y, r=40, color="#e6e8f0"):
    k = r * 0.18
    return f"""<g class="{P}-est {clase}"><path transform="translate({x} {y})" d="M0 {-r} C{k} {-k} {k} {-k} {r} 0 C{k} {k} {k} {k} 0 {r} C{-k} {k} {-k} {k} {-r} 0 C{-k} {-k} {-k} {-k} 0 {-r} Z" fill="{color}" /></g>"""

def DESTELLOS(P, clase, pts, color="#e6e8f0"):
    """pts: [(x, y, r), ...] -> estrellitas sueltas con la misma clase (para destello())."""
    return "".join(ESTRELLA(P, clase, x, y, r, color) for x, y, r in pts)

def HUMO(P, clase, x, y, s=1.0):
    return f"""
          <g class="{P}-humo {clase}"><g transform="translate({x} {y}) scale({s})">
            <circle cx="-90" cy="20" r="70" fill="#e6e8f0" fill-opacity="0.22" stroke="#e6e8f0" stroke-width="6" />
            <circle cx="0" cy="-30" r="96" fill="#e6e8f0" fill-opacity="0.26" stroke="#e6e8f0" stroke-width="6" />
            <circle cx="96" cy="16" r="74" fill="#e6e8f0" fill-opacity="0.22" stroke="#e6e8f0" stroke-width="6" />
            <circle cx="20" cy="60" r="70" fill="#c3a2ff" fill-opacity="0.22" stroke="#e6e8f0" stroke-width="6" />
            <circle cx="-40" cy="-90" r="50" fill="#c3a2ff" fill-opacity="0.2" stroke="#e6e8f0" stroke-width="5" />
          </g></g>"""

def REFLECTOR(P, clase="", cx=540, cy=1440, rx=360, ry=70, x_top=540):
    return f"""
          <g class="{P}-refl {clase}">
            <path class="haz {P}-haz" d="M{x_top - 40} 0 L{x_top + 40} 0 L{cx + rx} {cy} L{cx - rx} {cy} Z" />
            <ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="#e6e8f0" opacity="0.13" />
            <ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="#e6e8f0" stroke-width="5" opacity="0.55" />
          </g>"""

def CAJA(P, clase, x, y, s=1.0, cortada=False):
    """Caja de la mujer cortada al medio, con la asistente adentro (cabeza a la izquierda,
    pies a la derecha). (x, y) = centro de la caja, 620 x 210."""
    return f"""
          <g class="{P}-caja {clase}"><g transform="translate({x} {y}) scale({s})">
            <path class="l" d="M-250 105 L-270 230 M250 105 L270 230 M-120 105 L-130 230 M120 105 L130 230" stroke-width="10" />
            <g class="{P}-caja-izq">
              <ellipse class="b" cx="-354" cy="-10" rx="46" ry="54" />
              <path class="k" d="M-396 -20 C-396 -70 -320 -76 -310 -30 C-330 -46 -370 -44 -396 -20 Z" />
              <path class="p" d="M-380 -60 C-400 -110 -380 -140 -360 -160 C-350 -120 -356 -90 -360 -62 Z" stroke-width="5" />
              <circle cx="-370" cy="-10" r="6" fill="#e6e8f0" /><circle cx="-340" cy="-10" r="6" fill="#e6e8f0" />
              <path class="s {P}-caja-boca" d="M-368 14 C-360 30 -344 30 -336 14 Z" stroke-width="4" />
              <rect class="k" x="-310" y="-105" width="310" height="210" rx="10" />
              <path class="vl" d="M-280 -70 H-30 M-280 70 H-30" stroke-width="5" opacity="0.7" />
            </g>
            <g class="{P}-caja-der">
              <rect class="k" x="0" y="-105" width="310" height="210" rx="10" />
              <path class="vl" d="M30 -70 H280 M30 70 H280" stroke-width="5" opacity="0.7" />
              <path class="b" d="M310 -20 L370 -40 L384 -10 L326 6 Z" stroke-width="6" />
              <path class="b" d="M310 30 L372 22 L380 52 L318 56 Z" stroke-width="6" />
              <path class="p" d="M368 -46 L396 -52 L398 -26 L384 -12 Z M372 18 L402 18 L398 46 L380 52 Z" stroke-width="5" />
            </g>
            {ESTRELLA(P, "", -160, 0, 36, "#ff4fa3")}{ESTRELLA(P, "", 160, 0, 36, "#ff4fa3")}
          </g></g>"""

def SIERRA(P, clase, x, y, s=1.0, rot=0):
    dientes = " ".join(f"L{-200 + i * 20 + 10} 46 L{-200 + i * 20 + 20} 30" for i in range(20))
    return f"""
          <g class="{P}-sierra {clase}"><g transform="translate({x} {y}) rotate({rot}) scale({s})">
            <path class="s" d="M-200 -30 L200 -30 L200 30 {dientes} L-200 30 Z" stroke="#0a0610" stroke-width="4" />
            <path class="p" d="M200 -50 C260 -50 300 -30 300 10 C300 50 260 66 200 66 Z M228 -14 C258 -14 268 0 268 10 C268 26 254 34 228 34 Z" stroke-width="6" fill-rule="evenodd" />
          </g></g>"""

def CONEJO(P, clase, x, y, s=1.0):
    return f"""
          <g class="{P}-conejo {clase}"><g transform="translate({x} {y}) scale({s})">
            <path class="s" d="M-44 -60 C-70 -170 -40 -220 -20 -210 C0 -200 -6 -120 -14 -70 Z" stroke="#0a0610" stroke-width="5" />
            <path class="s" d="M44 -60 C70 -170 40 -220 20 -210 C0 -200 6 -120 14 -70 Z" stroke="#0a0610" stroke-width="5" />
            <path d="M-36 -80 C-50 -150 -34 -190 -24 -186 M36 -80 C50 -150 34 -190 24 -186" fill="none" stroke="#ff4fa3" stroke-width="8" stroke-linecap="round" />
            <ellipse class="s" cx="0" cy="0" rx="78" ry="70" stroke="#0a0610" stroke-width="5" />
            <circle class="{P}-conejo-ojo" cx="-28" cy="-8" r="9" fill="#0a0610" /><circle class="{P}-conejo-ojo" cx="28" cy="-8" r="9" fill="#0a0610" />
            <path d="M-8 18 L8 18 L0 28 Z" fill="#ff4fa3" />
            <path d="M-50 30 L-90 22 M-50 40 L-92 44 M50 30 L90 22 M50 40 L92 44" stroke="#0a0610" stroke-width="4" stroke-linecap="round" />
          </g></g>"""

def RELOJ(P, clase, x, y, r=90, hh=1, mm=0):
    import math
    ah = math.radians((hh % 12) * 30 + mm * 0.5 - 90)
    am = math.radians(mm * 6 - 90)
    marcas = " ".join(f"M{x + (r - 16) * math.cos(math.radians(i * 30)):.1f} {y + (r - 16) * math.sin(math.radians(i * 30)):.1f} L{x + (r - 6) * math.cos(math.radians(i * 30)):.1f} {y + (r - 6) * math.sin(math.radians(i * 30)):.1f}" for i in range(12))
    return f"""
          <g class="{P}-reloj {clase}">
            <circle class="k" cx="{x}" cy="{y}" r="{r}" />
            <path class="l" d="{marcas}" stroke-width="5" />
            <path class="{P}-aguja-h" d="M{x} {y} L{x + r * 0.5 * math.cos(ah):.1f} {y + r * 0.5 * math.sin(ah):.1f}" stroke="#e6e8f0" stroke-width="10" stroke-linecap="round" />
            <path class="{P}-aguja-m" d="M{x} {y} L{x + r * 0.75 * math.cos(am):.1f} {y + r * 0.75 * math.sin(am):.1f}" stroke="#ff4fa3" stroke-width="7" stroke-linecap="round" />
            <circle cx="{x}" cy="{y}" r="9" fill="#ff4fa3" />
          </g>"""

def GLOBO(P, clase, x, y, w, texto, lado="izq", fondo="#e6e8f0", tinta="#0a0610", fs=40):
    return f"""<div class="{P}-globo {clase}" style="position:absolute;left:{x}px;top:{y}px;width:{w}px;padding:20px 26px 18px;background:{fondo};color:{tinta};border-radius:28px;border-{'bottom-left' if lado == 'izq' else 'bottom-right'}-radius:6px;font-family:'Lexend',sans-serif;font-weight:700;font-size:{fs}px;line-height:1.12;">{texto}</div>"""

def CARTEL(P, clase, x, y, texto, fondo="#ff4fa3", tinta="#0a0610", fs=44, rot=0):
    return f"""<div class="cartela {P}-cartel {clase}" style="left:{x}px;top:{y}px;background:{fondo};color:{tinta};font-size:{fs}px;transform:rotate({rot}deg);">{texto}</div>"""

def ENGRANAJE(P, clase, x, y, r=80, color="#5ce611"):
    import math
    dientes = "".join(f'<rect x="{-r * 0.16:.1f}" y="{-r * 1.22:.1f}" width="{r * 0.32:.1f}" height="{r * 0.4:.1f}" rx="6" fill="{color}" transform="rotate({i * 45})" />' for i in range(8))
    return f"""<g class="{P}-eng {clase}" transform="translate({x} {y})"><g class="{P}-eng-gira">{dientes}<circle r="{r}" fill="{color}" /><circle r="{r * 0.4:.1f}" fill="#0a0610" /></g></g>"""
