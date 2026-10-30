# Personajes y utilería de "Código rojo" (iguales en todas las escenas).
# Cada función devuelve SVG en coordenadas locales (personajes: torso 0..360 x, cabeza ~y 140-320,
# base del torso en y 520). La escena los ubica con <g transform="translate(..) scale(..)">.
# P = prefijo de la escena (s05...), para las partes que se animan.

TORSO = "M30 520 C30 400 90 360 180 360 C270 360 330 400 330 520 Z"


def doctora(P):
    return f'''
      <path class="q" d="{TORSO}" />
      <path class="l" d="M140 364 L180 424 L220 364" />
      <path class="l" d="M118 374 C100 444 138 486 180 486 C222 486 260 444 242 374" stroke-width="6" />
      <circle class="w" cx="180" cy="490" r="15" />
      <path class="l" d="M262 430 V470 M276 430 V466" stroke-width="5" />
      <ellipse class="b" cx="180" cy="234" rx="78" ry="90" />
      <path class="q" d="M98 200 C92 112 268 112 262 200 C222 184 138 184 98 200 Z" />
      <circle cx="232" cy="150" r="5" fill="#eef6f5" /><circle cx="140" cy="146" r="5" fill="#eef6f5" /><circle cx="186" cy="134" r="5" fill="#eef6f5" />
      <rect class="l" x="120" y="216" width="52" height="38" rx="13" stroke-width="5" />
      <rect class="l" x="188" y="216" width="52" height="38" rx="13" stroke-width="5" />
      <path class="l" d="M172 232 H188" stroke-width="5" />
      <circle class="{P}-dojos" cx="146" cy="236" r="7" fill="#eef6f5" /><circle class="{P}-dojos" cx="214" cy="236" r="7" fill="#eef6f5" />
      <path class="l {P}-dcejas" d="M124 204 L166 200 M236 204 L194 200" stroke-width="6" />
      <path class="b {P}-dboca" d="M160 290 C172 298 188 298 200 290 Z" />
'''


def paramedico(P):
    return f'''
      <path class="r" d="{TORSO}" />
      <path d="M40 452 H320" stroke="#eef6f5" stroke-width="20" />
      <path class="l" d="M180 364 V520" stroke-width="5" />
      <ellipse class="b" cx="180" cy="238" rx="76" ry="86" />
      <path class="r" d="M104 206 C98 132 262 132 256 206 Z" />
      <path class="r" d="M236 204 C282 202 304 210 312 222 L240 222 Z" />
      <path d="M170 160 h20 v-14 h14 v14 h20 v14 h-20 v14 h-14 v-14 h-20 Z" fill="#eef6f5" transform="translate(-14 4)" />
      <circle cx="150" cy="240" r="7" fill="#eef6f5" /><circle cx="210" cy="240" r="7" fill="#eef6f5" />
      <path class="l {P}-pcejas" d="M128 214 L168 224 M232 214 L192 224" stroke-width="6" />
      <ellipse class="b {P}-pboca" cx="180" cy="290" rx="24" ry="16" />
'''


def duenio(P):
    # el dueño, sentado en la camilla, con bata de paciente de lunares
    return f'''
      <path d="{TORSO}" fill="#cfe5e2" stroke="#eef6f5" stroke-width="7" stroke-linejoin="round" />
      <g fill="#4fc3b0"><circle cx="90" cy="440" r="7"/><circle cx="140" cy="410" r="7"/><circle cx="130" cy="480" r="7"/><circle cx="190" cy="450" r="7"/><circle cx="240" cy="410" r="7"/><circle cx="250" cy="480" r="7"/><circle cx="290" cy="440" r="7"/><circle cx="190" cy="500" r="7"/></g>
      <path class="l" d="M130 364 C150 384 210 384 230 364" stroke="#0b2e35" stroke-width="5" />
      <ellipse class="b" cx="180" cy="236" rx="80" ry="90" />
      <path class="l" d="M108 196 L90 166 M128 166 L118 132 M164 150 L166 112 M204 152 L222 120 M240 168 L266 144 M256 200 L280 186" stroke-width="7" />
      <path class="l" d="M134 254 C142 262 156 262 164 254 M196 254 C204 262 218 262 226 254" stroke-width="4" opacity="0.6" />
      <circle cx="150" cy="238" r="7" fill="#eef6f5" /><circle cx="210" cy="238" r="7" fill="#eef6f5" />
      <path class="l {P}-ucejas" d="M128 214 L166 200 M232 214 L194 200" stroke-width="6" />
      <ellipse class="b {P}-uboca" cx="180" cy="292" rx="22" ry="14" />
      <g fill="#eef6f5" opacity="0.5"><circle cx="138" cy="300" r="3"/><circle cx="150" cy="316" r="3"/><circle cx="170" cy="324" r="3"/><circle cx="192" cy="324" r="3"/><circle cx="212" cy="316" r="3"/><circle cx="224" cy="300" r="3"/></g>
      <rect x="226" y="480" width="70" height="22" rx="8" fill="#ff3341" stroke="#eef6f5" stroke-width="4" />
'''


def camilla(P, ancho=720):
    # vista de costado: colchón, baranda, patas con ruedas. Origen arriba a la izquierda del colchón.
    a = ancho
    return f'''
      <path class="l" d="M40 70 L90 190 M{a-40} 70 L{a-90} 190 M90 190 H{a-90}" stroke-width="7" />
      <circle class="b {P}-rueda" cx="90" cy="214" r="24" /><circle class="b {P}-rueda" cx="{a-90}" cy="214" r="24" />
      <rect class="q" x="0" y="0" width="{a}" height="70" rx="20" />
      <path class="l" d="M20 -40 V0 M20 -40 H{a*0.4:.0f} M{a*0.4:.0f} -40 V0" stroke-width="6" />
'''


def sabana(ancho=420):
    # la sábana sobre las piernas (sale del torso hacia la derecha)
    return f'<path d="M0 0 H{ancho} C{ancho+40} 0 {ancho+40} 70 {ancho} 70 H0 Z" fill="#eef6f5" opacity="0.92" stroke="#eef6f5" stroke-width="7" stroke-linejoin="round" />'


def latido(x0, y0, ancho, alto=1.0, paso=150):
    # polilínea de electrocardiograma desde x0 a x0+ancho, línea base y0
    d = f"M{x0} {y0}"
    x = x0
    while x + paso <= x0 + ancho + 0.1:
        a = alto
        d += (f" H{x+40} L{x+50} {y0-12*a:.0f} L{x+60} {y0} H{x+68} L{x+76} {y0+26*a:.0f}"
              f" L{x+88} {y0-96*a:.0f} L{x+100} {y0+40*a:.0f} L{x+108} {y0} L{x+122} {y0-16*a:.0f} L{x+134} {y0} H{x+paso}")
        x += paso
    return d


def agente(P):
    # el agente de IA: un celular verde con cara y auriculares (centro 540, 940 en coords del SVG)
    return f'''
      <path class="gl" d="M330 860 C330 700 750 700 750 860" stroke-width="16" />
      <rect class="g" x="300" y="840" width="70" height="140" rx="26" />
      <rect class="g" x="710" y="840" width="70" height="140" rx="26" />
      <path class="gl" d="M740 980 C760 1060 700 1090 640 1080" stroke-width="8" />
      <circle cx="636" cy="1080" r="14" fill="#5ce611" />
      <rect x="380" y="700" width="320" height="480" rx="46" fill="#0b2e35" stroke="#5ce611" stroke-width="9" />
      <rect x="490" y="720" width="100" height="12" rx="6" fill="#5ce611" opacity="0.6" />
      <g class="{P}-aojos"><path class="gl" d="M460 880 h50 M570 880 h50" stroke-width="14" /></g>
      <path class="gl {P}-aboca" d="M480 960 C520 1000 560 1000 600 960" stroke-width="10" />
'''


def negatoscopio(P):
    # caja de luz con la radiografía del torso del local (coordenadas globales del SVG)
    costillas = ""
    for k, y in enumerate(range(770, 1100, 62)):
        costillas += (f'<path class="xl {P}-cos" d="M526 {y} C440 {y-14} 350 {y+10} 312 {y+70}" />'
                      f'<path class="xl {P}-cos" d="M554 {y} C640 {y-14} 730 {y+10} 768 {y+70}" />')
    vert = "".join(f'<rect x="522" y="{y}" width="36" height="34" rx="8" fill="#9fe3ff" opacity="0.55" />' for y in range(690, 1230, 46))
    return f'''
      <rect x="150" y="450" width="780" height="900" rx="26" fill="#0b2e35" stroke="#eef6f5" stroke-width="8" />
      <rect x="180" y="480" width="720" height="840" rx="12" fill="#9fe3ff" opacity="0.12" />
      <rect class="{P}-luz" x="180" y="480" width="720" height="840" rx="12" fill="#9fe3ff" opacity="0.06" />
      <path class="l" d="M200 1350 V1400 M880 1350 V1400" stroke-width="10" opacity="0.6" />
      <g class="{P}-rx">
        <circle class="xl {P}-ln" cx="540" cy="560" r="58" />
        <path class="xl {P}-ln" d="M508 618 V668 M572 618 V668" />
        <path class="xl {P}-ln" d="M540 670 C420 670 300 690 250 760 L236 1260 M540 670 C660 670 780 690 830 760 L844 1260" />
        <path class="xl {P}-ln" d="M330 720 C400 700 470 704 520 716 M560 716 C610 704 680 700 750 720" />
        {vert}
        {costillas}
      </g>
'''


def corazon(cx, cy, s=1.0, cls="", fill="#9fe3ff", stroke="#eef6f5"):
    return (f'<path class="{cls}" transform="translate({cx} {cy}) scale({s})" d="M0 30 C-10 10 -60 -10 -60 -40 C-60 -70 -20 -80 0 -50 C20 -80 60 -70 60 -40 C60 -10 10 10 0 30 Z" '
            f'fill="{fill}" stroke="{stroke}" stroke-width="6" stroke-linejoin="round" />')
