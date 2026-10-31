# Piezas compartidas por las escenas de el-heroe (cómic de superhéroes).
# Personajes en coordenadas locales (cabeza arriba, torso abajo, ~360 x 600): ponelos dentro de
# un <g transform="translate(x y) scale(s)">. Las clases llevan el prefijo P de la escena.
# Paleta: tinta #111111, papel #fdf6e3, amarillo #ffd23f, rojo #e63946, azul #2f6fe0,
# noche #1d2b53 / #0b1430 y celeste tildes #4fc3ff (solo El Visto y lo de WhatsApp).

def DEFS(P):
    """Tramas de puntos (halftone) para sombras y fondos de viñeta."""
    return f"""
          <defs>
            <pattern id="{P}-ht" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="9" cy="9" r="3.4" fill="#111111" /></pattern>
            <pattern id="{P}-htg" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="13" cy="13" r="6" fill="#111111" /></pattern>
            <pattern id="{P}-hty" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#ffd23f" /><circle cx="11" cy="11" r="4.4" fill="#e63946" opacity="0.55" /></pattern>
            <pattern id="{P}-htc" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#2f6fe0" /><circle cx="10" cy="10" r="4" fill="#4fc3ff" opacity="0.6" /></pattern>
            <pattern id="{P}-htn" width="22" height="22" patternUnits="userSpaceOnUse"><rect width="22" height="22" fill="#14214a" /><circle cx="11" cy="11" r="4" fill="#4fc3ff" opacity="0.22" /></pattern>
            <pattern id="{P}-htp" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="20" height="20" fill="#fdf6e3" /><circle cx="10" cy="10" r="3" fill="#e63946" opacity="0.28" /></pattern>
          </defs>"""

def VINETA(P, cls, x, y, w, h, fondo="#fdf6e3", contenido="", sombra=True):
    """Viñeta: fondo, contenido recortado al cuadro, marco de tinta y sombra plana."""
    cid = f"{P}-cp-{cls}"
    s = f'<rect x="{x+14}" y="{y+14}" width="{w}" height="{h}" fill="#111111" />' if sombra else ""
    return f"""
          <g class="{cls}">
            {s}
            <clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" /></clipPath>
            <rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fondo}" />
            <g clip-path="url(#{cid})">{contenido}</g>
            <rect class="marco" x="{x}" y="{y}" width="{w}" height="{h}" />
          </g>"""

def RAYOS(P, cls, cx, cy, n=28, r1=160, r2=900, color="#111111", ancho=5, op=0.5):
    """Líneas de acción radiales (desde un centro hacia afuera)."""
    import math
    d = ""
    for i in range(n):
        a = 2 * math.pi * i / n + (0.07 if i % 2 else 0)
        rr1 = r1 + (i * 37) % 70
        d += f"M{cx + rr1*math.cos(a):.0f} {cy + rr1*math.sin(a):.0f} L{cx + r2*math.cos(a):.0f} {cy + r2*math.sin(a):.0f} "
    return f'<path class="{cls}" d="{d}" stroke="{color}" stroke-width="{ancho}" stroke-linecap="round" fill="none" opacity="{op}" />'

def ESTALLIDO(cls, cx, cy, r, puntas=14, fill="#ffd23f", rin=0.68, extra=""):
    """Estrella de cómic irregular (fondo de onomatopeya)."""
    import math
    pts = []
    for i in range(puntas * 2):
        a = math.pi * i / puntas - math.pi / 2
        k = 1 if i % 2 == 0 else rin
        k *= 1 + 0.12 * ((i * 7) % 3 - 1) * (1 if i % 2 == 0 else 0.4)
        pts.append(f"{cx + r*k*math.cos(a):.0f},{cy + r*k*math.sin(a)*0.82:.0f}")
    return f'<polygon class="{cls}" points="{" ".join(pts)}" fill="{fill}" stroke="#111111" stroke-width="8" stroke-linejoin="miter" {extra} />'

def ONO(cls, texto, x, y, size, color="#ffd23f", rot=-8, ancho=None):
    """Onomatopeya en HTML (Bangers con borde de tinta y sombra)."""
    w = f"width:{ancho}px;text-align:center;" if ancho else ""
    return f'<div class="ono {cls}" style="left:{x}px;top:{y}px;font-size:{size}px;color:{color};transform:rotate({rot}deg);{w}">{texto}</div>'

def CAJA(cls, texto, x, y, size=50, fondo="#ffd23f", color="#111111", rot=0):
    return f'<div class="caja {cls}" style="left:{x}px;top:{y}px;font-size:{size}px;background:{fondo};color:{color};transform:rotate({rot}deg)">{texto}</div>'

def GLOBO(cls, x, y, w, texto, cola="abajo-izq", fs=44, fondo="#fdf6e3"):
    """Globo de diálogo con cola. cola: abajo-izq, abajo-der, izq, der, arriba-izq."""
    pos = {
        "abajo-izq": ("left:70px;top:auto;bottom:-62px;", "M8 0 L4 58 L52 0"),
        "abajo-der": (f"left:auto;right:70px;top:auto;bottom:-62px;", "M18 0 L66 58 L62 0"),
        "izq": ("left:-60px;top:40px;", "M66 8 L0 40 L66 52"),
        "der": ("left:auto;right:-60px;top:40px;", "M4 8 L70 40 L4 52"),
        "arriba-izq": ("left:70px;top:-62px;", "M8 70 L4 12 L52 70"),
    }[cola]
    estilo, d = pos
    # la cola tapa el borde del globo: relleno sin trazo del lado del globo
    cola_svg = f'<svg class="cola" style="{estilo}" viewBox="0 0 70 70"><path d="{d}" fill="{fondo}" stroke="none" /><path d="{d}" fill="none" stroke="#111111" stroke-width="6" stroke-linejoin="round" stroke-dasharray="none" /><path d="{d.split(" L")[0]} L{d.split(" L")[-1]}" stroke="{fondo}" stroke-width="9" /></svg>'
    return f'<div class="globo {cls}" style="left:{x}px;top:{y}px;width:{w}px;font-size:{fs}px;background:{fondo}">{texto}{cola_svg}</div>'

# ---------------------------------------------------------------- personajes

def VISTO(P, telefono=True):
    """El Visto: supervillano encapuchado, capa noche con forro rojo, ojos de doble tilde celeste,
    emblema amarillo con las dos tildes. ~400 x 640, centrado en x 200."""
    tel = f"""
              <g class="{P}-vbrazo">
                <path class="n" d="M300 470 C356 440 366 372 340 322 L306 334 C324 376 316 410 278 432 Z" />
                <circle class="k" cx="326" cy="320" r="26" />
                <g transform="rotate(14 340 270)"><rect class="k" x="304" y="200" width="78" height="134" rx="14" /><rect x="314" y="214" width="58" height="96" rx="6" fill="#4fc3ff" /></g>
              </g>""" if telefono else f"""
              <g class="{P}-vbrazo"><path class="n" d="M300 470 C340 470 360 520 356 600 L316 600 C318 540 310 510 290 500 Z" /></g>"""
    return f"""
              <path class="r" d="M24 640 C40 480 80 370 140 330 L260 330 C320 370 360 480 376 640 Z" />
              <path class="nn" d="M40 640 C58 486 96 384 150 344 L250 344 C304 384 342 486 360 640 Z" />
              <path class="r" d="M120 352 L58 250 L168 318 Z M280 352 L342 250 L232 318 Z" />
              <path class="n" d="M84 640 C84 490 124 410 200 410 C276 410 316 490 316 640 Z" />
              <path d="M110 640 C110 520 140 450 178 430" fill="url(#{P}-ht)" opacity="0.5" stroke="none" />
              <circle class="y" cx="200" cy="520" r="52" />
              <path d="M164 518 L182 536 L214 500 M196 534 L228 498" fill="none" stroke="#111111" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
              <path class="n" d="M114 360 C96 262 126 150 200 112 C274 150 304 262 286 360 C250 384 150 384 114 360 Z" />
              <path class="k" d="M144 340 C134 270 158 216 200 212 C242 216 266 270 256 340 C230 356 170 356 144 340 Z" />
              <g class="{P}-ojos">
                <path d="M158 270 L174 286 L198 258" fill="none" stroke="#4fc3ff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M204 270 L220 286 L244 258" fill="none" stroke="#4fc3ff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
              </g>
              <path class="{P}-boca" d="M170 314 C186 328 214 328 230 314" fill="none" stroke="#fdf6e3" stroke-width="6" stroke-linecap="round" />
              <path d="M178 318 L182 326 M192 322 L194 330 M208 322 L206 330 M222 318 L218 326" stroke="#fdf6e3" stroke-width="4" stroke-linecap="round" />{tel}
"""

def CLIENTA(P, telefono=True, cara="feliz"):
    """La clienta: pelo negro con cola de caballo, remera roja, aros amarillos, celular azul."""
    boca = {
        "feliz": f'<path class="{P}-boca" d="M160 284 C170 300 192 300 202 284 Z" fill="#e63946" stroke="#111111" stroke-width="5" stroke-linejoin="round" />',
        "triste": f'<path class="{P}-boca" d="M162 296 C172 284 190 284 200 296" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round" />',
        "o": f'<ellipse class="{P}-boca" cx="181" cy="292" rx="14" ry="18" fill="#e63946" stroke="#111111" stroke-width="5" />',
    }[cara]
    tel = f"""
              <g class="{P}-cbrazo">
                <path class="r" d="M300 470 C350 440 360 380 330 330 L298 342 C316 380 310 420 270 440 Z" />
                <circle class="p" cx="318" cy="324" r="22" />
                <g transform="rotate(12 333 270)"><rect class="a" x="298" y="196" width="72" height="128" rx="14" /><rect class="{P}-cpant" x="308" y="210" width="52" height="88" rx="6" fill="#fdf6e3" /></g>
              </g>""" if telefono else ""
    return f"""
              <path class="k" d="M96 250 C84 340 104 392 140 404 L222 404 C258 392 276 340 266 250 Z" />
              <path class="r" d="M30 600 C30 450 92 388 180 388 C268 388 330 450 330 600 Z" />
              <path d="M60 600 C60 500 90 440 140 410" fill="url(#{P}-ht)" opacity="0.35" stroke="none" />
              <path class="p" d="M154 304 V394 C164 402 196 402 206 394 V304" />
              <ellipse class="p" cx="180" cy="236" rx="70" ry="80" />
              <path class="k" d="M106 232 C96 160 138 126 182 126 C228 126 266 160 256 232 C234 196 204 186 180 198 C154 186 126 204 106 232 Z" />
              <path class="k" d="M236 150 C300 126 330 190 312 262 C300 232 280 204 246 196 Z" />
              <circle class="y" cx="112" cy="268" r="10" stroke-width="5" /><circle class="y" cx="250" cy="268" r="10" stroke-width="5" />
              <g class="{P}-cojos"><ellipse cx="154" cy="246" rx="9" ry="12" fill="#111111" /><ellipse cx="208" cy="246" rx="9" ry="12" fill="#111111" />
              <path d="M140 232 L134 226 M222 232 L228 226" stroke="#111111" stroke-width="5" stroke-linecap="round" /></g>
              <circle cx="138" cy="276" r="11" fill="#e63946" opacity="0.45" /><circle cx="224" cy="276" r="11" fill="#e63946" opacity="0.45" />
              {boca}{tel}
"""

def DUENO(P, cara="cansado"):
    """El dueño de la confitería: gorro de cocinero, bigote, delantal azul."""
    boca = {
        "cansado": f'<path class="{P}-boca" d="M164 310 C174 302 188 302 198 310" fill="none" stroke="#111111" stroke-width="6" stroke-linecap="round" />',
        "grito": f'<g class="{P}-boca"><path d="M160 300 C162 340 200 340 202 300 Z" fill="#111111" stroke="#111111" stroke-width="5" stroke-linejoin="round" /><path d="M168 326 C174 316 188 316 194 326 C188 334 174 334 168 326 Z" fill="#e63946" /></g>',
        "feliz": f'<path class="{P}-boca" d="M158 300 C168 322 194 322 204 300 Z" fill="#e63946" stroke="#111111" stroke-width="5" stroke-linejoin="round" />',
    }[cara]
    cejas = "M134 222 L168 232 M228 222 L194 232" if cara == "grito" else ("M136 226 L166 218 M226 226 L196 218" if cara == "feliz" else "M134 230 L166 220 M228 230 L196 220")
    return f"""
              <path class="p" d="M30 600 C30 450 92 392 180 392 C268 392 330 450 330 600 Z" />
              <path class="a" d="M96 440 L264 440 L276 600 L84 600 Z" />
              <path d="M104 600 L112 470 L150 470 L140 600 Z" fill="url(#{P}-ht)" opacity="0.4" stroke="none" />
              <path class="l" d="M96 440 L150 396 M264 440 L210 396" stroke-width="6" />
              <path class="p" d="M152 310 V398 C164 408 196 408 208 398 V310" />
              <ellipse class="p" cx="180" cy="250" rx="76" ry="82" />
              <path class="p" d="M110 196 C76 190 74 128 118 124 C118 78 172 66 190 98 C212 66 268 82 254 126 C294 128 292 190 252 196 Z" />
              <rect class="p" x="110" y="180" width="144" height="36" rx="6" />
              <path class="l" d="M150 132 C152 150 152 164 150 178 M210 132 C208 150 208 164 210 178" stroke-width="5" opacity="0.6" />
              <ellipse cx="152" cy="252" rx="8" ry="10" fill="#111111" /><ellipse cx="208" cy="252" rx="8" ry="10" fill="#111111" />
              <path d="{cejas}" stroke="#111111" stroke-width="7" stroke-linecap="round" fill="none" />
              <path class="k" d="M136 288 C156 270 176 274 180 286 C184 274 204 270 224 288 C206 300 188 298 180 292 C172 298 154 300 136 288 Z" stroke-width="4" />
              {boca}
              <path class="{P}-sudor c" d="M262 210 C252 230 254 244 266 244 C278 244 278 230 262 210 Z" stroke-width="5" />
              <path class="{P}-sudor2 c" d="M96 236 C88 252 90 262 100 262 C110 262 110 252 96 236 Z" stroke-width="5" />
"""

def AGENTE(P, brazo="arriba"):
    """El agente de IA: un celular azul con antifaz rojo, sin capa ni músculos. ~260 x 480."""
    if brazo == "arriba":
        brazos = f'<path class="l {P}-abr1" d="M28 250 C0 226 -14 188 -6 150" stroke-width="9" /><circle class="p" cx="-6" cy="140" r="18" stroke-width="6" /><path class="l {P}-abr2" d="M232 250 C262 270 270 300 252 320" stroke-width="9" /><circle class="p" cx="250" cy="326" r="16" stroke-width="6" />'
    else:  # saluda / señala
        brazos = f'<path class="l {P}-abr1" d="M28 250 C0 270 -8 300 6 324" stroke-width="9" /><circle class="p" cx="8" cy="330" r="16" stroke-width="6" /><g class="{P}-amano"><path class="l {P}-abr2" d="M232 240 C266 220 280 190 274 156" stroke-width="9" /><circle class="p" cx="274" cy="146" r="18" stroke-width="6" /></g>'
    return f"""
              <path class="l" d="M96 396 L88 462 M164 396 L172 462" stroke-width="9" />
              <ellipse class="k" cx="80" cy="468" rx="30" ry="14" /><ellipse class="k" cx="180" cy="468" rx="30" ry="14" />
              {brazos}
              <rect class="a" x="20" y="36" width="220" height="370" rx="42" />
              <path d="M30 120 L30 360 C30 380 40 396 60 396 L80 396 L80 60 C50 60 30 80 30 120 Z" fill="url(#{P}-ht)" opacity="0.35" stroke="none" />
              <rect class="p {P}-apant" x="42" y="76" width="176" height="290" rx="18" />
              <rect x="104" y="52" width="52" height="10" rx="5" fill="#111111" />
              <path class="r" d="M54 176 C74 150 116 154 130 172 C144 154 186 150 206 176 C204 212 166 220 130 202 C94 220 56 212 54 176 Z" stroke-width="6" />
              <g class="{P}-aojos"><ellipse cx="94" cy="182" rx="13" ry="10" fill="#fdf6e3" stroke="#111111" stroke-width="4" /><ellipse cx="166" cy="182" rx="13" ry="10" fill="#fdf6e3" stroke="#111111" stroke-width="4" /></g>
              <path class="{P}-boca" d="M98 250 C116 276 144 276 162 250" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round" />
              <g class="{P}-aemb"><path class="y" d="M86 300 H174 C186 300 192 306 192 318 V336 C192 348 186 354 174 354 H120 L102 370 L104 354 H86 C74 354 68 348 68 336 V318 C68 306 74 300 86 300 Z" stroke-width="5" />
              <text x="130" y="340" text-anchor="middle" font-family="Bangers" font-size="34" fill="#111111">IA</text></g>
"""

def TIO(P):
    """El tío sabio de los cómics (genérico): pelado, anteojos, bigote blanco, saco rojo."""
    return f"""
              <path class="r" d="M30 600 C30 450 92 392 180 392 C268 392 330 450 330 600 Z" />
              <path class="p" d="M150 396 L180 470 L210 396 Z" stroke-width="5" />
              <path class="l" d="M180 470 V600" stroke-width="5" />
              <circle cx="180" cy="512" r="7" fill="#111111" /><circle cx="180" cy="556" r="7" fill="#111111" />
              <path class="p" d="M152 310 V398 H208 V310" />
              <ellipse class="p" cx="180" cy="246" rx="76" ry="86" />
              <path class="p" d="M104 236 C92 210 96 186 110 180 C112 204 116 222 120 240 Z M256 236 C268 210 264 186 250 180 C248 204 244 222 240 240 Z" />
              <path d="M110 190 C118 170 128 166 136 168 M250 190 C242 170 232 166 224 168" stroke="#111111" stroke-width="5" fill="none" stroke-linecap="round" />
              <circle cx="152" cy="250" r="24" fill="none" stroke="#111111" stroke-width="6" /><circle cx="208" cy="250" r="24" fill="none" stroke="#111111" stroke-width="6" />
              <path d="M176 250 H184" stroke="#111111" stroke-width="6" />
              <circle cx="152" cy="252" r="6" fill="#111111" /><circle cx="208" cy="252" r="6" fill="#111111" />
              <path class="p" d="M140 296 C156 280 176 284 180 294 C184 284 204 280 220 296 C204 312 186 306 180 300 C174 306 156 312 140 296 Z" stroke-width="5" />
              <path class="{P}-boca" d="M168 318 C176 324 186 324 194 318" fill="none" stroke="#111111" stroke-width="5" stroke-linecap="round" />
              <path d="M132 214 L168 220 M228 214 L192 220" stroke="#111111" stroke-width="6" stroke-linecap="round" />
"""

def FORTACHON(P):
    """El héroe que todos imaginan (genérico): espalda ancha, capa roja, cinturón amarillo."""
    return f"""
              <path class="r {P}-fcapa" d="M70 300 C20 420 0 560 -20 640 L380 640 C360 560 340 420 290 300 Z" />
              <path class="a" d="M40 640 C40 470 60 360 180 340 C300 360 320 470 320 640 Z" />
              <path d="M60 640 C64 520 80 420 130 370" fill="url(#{P}-ht)" opacity="0.45" stroke="none" />
              <path class="l" d="M110 420 C140 450 220 450 250 420 M180 450 V560" stroke-width="6" />
              <path class="y" d="M140 400 L180 370 L220 400 L180 470 Z" stroke-width="6" />
              <rect class="y" x="60" y="560" width="240" height="34" />
              <path class="p" d="M156 270 V344 H204 V270" />
              <path class="p" d="M120 200 C120 140 150 120 180 120 C210 120 240 140 240 200 C240 260 214 290 180 290 C146 290 120 260 120 200 Z" />
              <path class="k" d="M118 190 C110 130 150 100 186 102 C226 104 252 136 242 190 C226 160 200 150 178 156 C156 150 132 160 118 190 Z" />
              <path class="r" d="M128 196 C146 182 168 186 178 196 C188 186 214 182 232 196 C230 216 206 222 180 212 C154 222 130 216 128 196 Z" stroke-width="5" />
              <path d="M150 250 C166 262 194 262 210 250" stroke="#111111" stroke-width="6" fill="none" stroke-linecap="round" />
"""

def TORTA(P, cls=""):
    """Torta de chocolate de cumpleaños con velita. ~300 x 300, centrada en x 150."""
    return f"""
              <g class="{cls}">
              <ellipse class="p" cx="150" cy="292" rx="150" ry="26" />
              <path class="k" d="M30 170 L30 270 C30 290 270 290 270 270 L270 170 Z" />
              <path d="M44 176 L44 262 C70 276 100 280 120 280 L120 176 Z" fill="url(#{P}-htg)" opacity="0" stroke="none" />
              <path class="pl" d="M40 222 C90 232 210 232 260 222" stroke-width="6" opacity="0.8" />
              <ellipse class="k" cx="150" cy="170" rx="120" ry="30" />
              <path class="p" d="M32 172 C40 196 50 196 56 182 C64 208 78 208 84 186 C96 200 108 198 114 190 C126 212 140 210 146 192 C158 204 170 204 178 192 C188 214 204 212 210 190 C222 204 236 202 242 186 C252 200 262 196 268 172 C240 150 60 150 32 172 Z" stroke-width="5" />
              <rect class="y" x="140" y="96" width="20" height="62" rx="4" stroke-width="5" />
              <path class="r {cls}-llama" d="M150 92 C136 76 140 56 150 40 C160 56 164 76 150 92 Z" stroke-width="5" />
              <circle class="r" cx="96" cy="156" r="12" stroke-width="5" /><circle class="r" cx="206" cy="156" r="12" stroke-width="5" />
              </g>"""

def PULGAR(P, cls, fill="#1d2b53"):
    """Mano con el pulgar para arriba (dibujada), guante del villano. ~260 x 300."""
    return f"""
              <g class="{cls}">
              <path d="M40 150 L100 150 L100 300 L40 300 Z" fill="#0b1430" stroke="#111111" stroke-width="8" stroke-linejoin="round" />
              <path d="M100 160 C120 150 140 120 146 80 C150 40 170 20 190 30 C210 40 208 80 196 120 L250 120 C276 120 282 150 266 162 C282 170 280 196 262 204 C276 214 272 238 254 244 C266 254 262 280 238 284 L120 290 C108 290 100 284 100 276 Z" fill="{fill}" stroke="#111111" stroke-width="8" stroke-linejoin="round" />
              <path d="M200 162 L262 162 M200 204 L258 204 M200 244 L250 244" stroke="#111111" stroke-width="6" stroke-linecap="round" />
              <path d="M120 180 C130 200 130 250 122 276" stroke="#4fc3ff" stroke-width="5" fill="none" opacity="0.6" stroke-linecap="round" />
              </g>"""

def TILDES(cls, x, y, s=1.0, color="#4fc3ff"):
    return f'<g class="{cls}"><g transform="translate({x} {y}) scale({s})"><path d="M-70 0 L-36 34 L32 -40 M0 34 L68 -40" fill="none" stroke="#111111" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" /><path d="M-70 0 L-36 34 L32 -40 M0 34 L68 -40" fill="none" stroke="{color}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" /></g></g>'

def CIUDAD(P, y0=1500, cls_ventanas=""):
    """Skyline nocturno (siluetas noche con ventanas amarillas). Base en y0, ancho 1080."""
    edif = [(-10, 300, 150), (130, 430, 130), (250, 340, 170), (410, 520, 140), (540, 380, 160), (690, 470, 130), (810, 330, 150), (950, 420, 150)]
    out = []
    ven = []
    for i, (x, h, w) in enumerate(edif):
        out.append(f'<rect x="{x}" y="{y0-h}" width="{w}" height="{h+20}" fill="#0b1430" stroke="#111111" stroke-width="7" />')
        for fy in range(y0 - h + 40, y0 - 30, 64):
            for fx in range(x + 22, x + w - 30, 44):
                k = (fx * 7 + fy * 3 + i) % 5
                if k < 3:
                    ven.append(f'<rect class="{cls_ventanas} {cls_ventanas}-{k}" x="{fx}" y="{fy}" width="22" height="30" fill="#ffd23f" />')
    return "\n".join(out) + "\n" + "\n".join(ven)

def CELU_GRANDE(P, cls, x, y, w=560, h=900, titulo="Confitería del Barrio"):
    """Celular de frente (marco tinta, pantalla papel, barra azul de chat). El contenido va en HTML."""
    return f"""
          <g class="{cls}">
            <rect x="{x+16}" y="{y+16}" width="{w}" height="{h}" rx="60" fill="#111111" />
            <rect x="{x}" y="{y}" width="{w}" height="{h}" rx="60" fill="#111111" stroke="#111111" stroke-width="8" />
            <rect x="{x+22}" y="{y+22}" width="{w-44}" height="{h-44}" rx="40" fill="#fdf6e3" />
            <path d="M{x+22} {y+150} V{y+62} Q{x+22} {y+22} {x+62} {y+22} H{x+w-62} Q{x+w-22} {y+22} {x+w-22} {y+62} V{y+150} Z" fill="#2f6fe0" />
            <rect x="{x+w/2-60}" y="{y+34}" width="120" height="16" rx="8" fill="#111111" />
            <circle cx="{x+80}" cy="{y+100}" r="30" fill="#ffd23f" stroke="#111111" stroke-width="5" />
            <text x="{x+126}" y="{y+112}" font-family="Lexend" font-weight="700" font-size="32" fill="#fdf6e3">{titulo}</text>
          </g>"""
