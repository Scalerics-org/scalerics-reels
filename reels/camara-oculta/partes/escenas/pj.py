# Personajes y objetos compartidos (cada escena hace exec(PJ)). Devuelven SVG.
# Coordenadas locales: (0, 0) = abajo al centro del torso; la cabeza está cerca de y -310.
# P = prefijo de la escena (ej. "s02"): las partes que se animan llevan clase P-<pj>-<parte>.

def fede(P, x, y, s=1.0, boca="normal", cel=True, extra=""):
    """Fede: rulos crema, buzo rojo con capucha, celular en la mano."""
    bocas = {
        "normal": f'<path class="k {P}-fede-boca" d="M-20 -274 C-10 -262 10 -262 20 -274 Z" />',
        "o": f'<ellipse class="k {P}-fede-boca" cx="0" cy="-266" rx="16" ry="20" />',
        "risa": f'<path class="k {P}-fede-boca" d="M-30 -282 H30 C28 -246 -28 -246 -30 -282 Z" />',
        "mal": f'<path class="l {P}-fede-boca" d="M-22 -262 C-10 -276 10 -276 22 -262" />',
    }
    celu = f'''<g class="{P}-fede-cel">
        <rect class="k" x="34" y="-200" width="74" height="128" rx="14" />
        <rect x="46" y="-186" width="50" height="96" rx="6" fill="#ffd400" class="{P}-fede-pantalla" />
        <circle class="b" cx="56" cy="-86" r="22" />
      </g>''' if cel else ""
    return f'''<g class="{P}-fede"><g transform="translate({x} {y}) scale({s})">
      <path class="r" d="M-150 0 C-150 -150 -100 -222 0 -222 C100 -222 150 -150 150 0 Z" />
      <path class="l" d="M-74 -222 C-60 -186 60 -186 74 -222" />
      <path class="l" d="M-22 -196 V-140 M22 -196 V-140" stroke-width="5" />
      <path class="l" d="M-90 -40 H90" opacity="0.5" />
      <ellipse class="b" cx="0" cy="-308" rx="72" ry="80" />
      <g class="{P}-fede-pelo">
        <circle class="w" cx="-58" cy="-366" r="28" /><circle class="w" cx="-22" cy="-390" r="30" /><circle class="w" cx="18" cy="-392" r="30" />
        <circle class="w" cx="54" cy="-370" r="28" /><circle class="w" cx="72" cy="-336" r="20" /><circle class="w" cx="-72" cy="-336" r="20" />
      </g>
      <path class="l {P}-fede-cejas" d="M-44 -330 L-14 -342 M14 -342 L44 -330" stroke-width="6" />
      <circle class="{P}-fede-ojo" cx="-28" cy="-308" r="8" fill="#fbf7ea" /><circle class="{P}-fede-ojo" cx="28" cy="-308" r="8" fill="#fbf7ea" />
      {bocas[boca]}
      {celu}
      {extra}
    </g></g>'''


def conductor(P, x, y, s=1.0, boca="sonrisa", extra=""):
    """El conductor: engominado, lentes negros, auricular con micrófono amarillo, campera negra."""
    bocas = {
        "sonrisa": f'<path class="l {P}-con-boca" d="M-22 -252 C-8 -238 12 -240 26 -258" />',
        "abierta": f'<path class="k {P}-con-boca" d="M-28 -258 H28 C26 -224 -26 -224 -28 -258 Z" />',
        "seria": f'<path class="l {P}-con-boca" d="M-20 -248 H20" />',
    }
    return f'''<g class="{P}-con"><g transform="translate({x} {y}) scale({s})">
      <path class="k" d="M-150 0 C-150 -150 -100 -222 0 -222 C100 -222 150 -150 150 0 Z" />
      <path d="M0 -214 V0" stroke="#ffd400" stroke-width="7" stroke-linecap="round" />
      <path class="l" d="M-60 -214 L-20 -150 M60 -214 L20 -150" />
      <ellipse class="b" cx="0" cy="-300" rx="70" ry="80" />
      <path class="k" d="M-74 -306 C-80 -392 76 -404 76 -310 C50 -350 -20 -362 -74 -306 Z" />
      <rect class="k" x="-60" y="-326" width="52" height="32" rx="10" /><rect class="k" x="8" y="-326" width="52" height="32" rx="10" />
      <path class="l" d="M-8 -312 H8" stroke-width="5" />
      <path class="l" d="M-30 -270 C-15 -280 15 -280 30 -270" stroke-width="6" />
      {bocas[boca]}
      <path class="yl" d="M-82 -300 C-86 -420 86 -420 82 -300" stroke-width="10" />
      <rect class="y" x="-98" y="-328" width="26" height="54" rx="10" stroke-width="5" /><rect class="y" x="72" y="-328" width="26" height="54" rx="10" stroke-width="5" />
      <path class="yl {P}-con-mic" d="M-84 -280 C-74 -236 -50 -232 -34 -240" stroke-width="6" />
      <circle class="y" cx="-30" cy="-242" r="9" stroke-width="4" />
      {extra}
    </g></g>'''


def tito(P, x, y, s=1.0, boca="orgullo", extra=""):
    """Don Tito: boina negra, bigotazo crema, delantal crema, pinza de asado."""
    bocas = {
        "orgullo": f'<path class="l {P}-tito-boca" d="M-20 -238 C-8 -228 8 -228 20 -238" />',
        "abierta": f'<ellipse class="k {P}-tito-boca" cx="0" cy="-236" rx="20" ry="16" />',
    }
    return f'''<g class="{P}-tito"><g transform="translate({x} {y}) scale({s})">
      <path class="b" d="M-160 0 C-160 -150 -110 -222 0 -222 C110 -222 160 -150 160 0 Z" />
      <path class="w" d="M-80 -160 H80 L96 0 H-96 Z" />
      <path class="l" d="M-80 -160 C-80 -200 -50 -218 -40 -222 M80 -160 C80 -200 50 -218 40 -222" stroke="#0c0c0c" stroke-width="5" />
      <path d="M-50 -90 H50" stroke="#0c0c0c" stroke-width="5" stroke-linecap="round" />
      <ellipse class="b" cx="0" cy="-300" rx="78" ry="84" />
      <path class="k" d="M-84 -330 C-80 -398 80 -404 92 -332 C40 -350 -40 -350 -84 -330 Z" />
      <circle class="k" cx="4" cy="-392" r="10" />
      <path class="l {P}-tito-cejas" d="M-48 -322 L-18 -318 M18 -318 L48 -322" stroke-width="6" />
      <circle cx="-30" cy="-296" r="8" fill="#fbf7ea" /><circle cx="30" cy="-296" r="8" fill="#fbf7ea" />
      {bocas[boca]}
      <path class="w {P}-tito-bigote" d="M-58 -252 C-36 -280 -10 -272 0 -262 C10 -272 36 -280 58 -252 C34 -248 12 -250 0 -254 C-12 -250 -34 -248 -58 -252 Z" />
      {extra}
    </g></g>'''


def pinza(P, x, y, rot=0):
    return f'''<g class="{P}-pinza"><g transform="translate({x} {y}) rotate({rot})">
      <path class="l" d="M0 0 L0 -190 M14 0 L30 -190" stroke-width="9" />
      <rect class="k" x="-10" y="-10" width="36" height="70" rx="10" />
    </g></g>'''


def celular(P, x, y, w=500, h=820, extra=""):
    """Celular grande: marco negro con borde crema; la pantalla va en extra (coordenadas absolutas)."""
    return f'''<g class="{P}-cel">
      <rect class="k" x="{x}" y="{y}" width="{w}" height="{h}" rx="56" />
      <rect x="{x + w/2 - 60}" y="{y + 22}" width="120" height="20" rx="10" fill="#fbf7ea" opacity="0.5" />
      {extra}
    </g>'''


def nota(P, cls, x, y, s=1.0):
    """Corchea dibujada (sin emojis)."""
    return f'''<g class="{P}-nota {cls}"><g transform="translate({x} {y}) scale({s})">
      <ellipse class="y" cx="0" cy="0" rx="26" ry="20" transform="rotate(-20)" stroke-width="5" />
      <path class="l" d="M22 -8 V-110 C40 -96 60 -86 64 -60" stroke-width="7" />
    </g></g>'''
