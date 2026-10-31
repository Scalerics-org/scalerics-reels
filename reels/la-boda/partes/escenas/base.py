# Helpers para generar las escenas de reels/la-boda (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
# Paleta: contorno vino-negro, marfil, dorado, rosa empolvado, vino, azul vitral (+ verde Scalerics solo al final)
K, M, D, R, V, A, G = "#2a1220", "#fbf4e6", "#e3b448", "#eba5b3", "#9b2445", "#5b8ee0", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'


def _brazo(cls, x0, y0, x1, y1, x2, y2, color, mano=M, extra=""):
    return f'''<g class="{cls}">
    <path d="M{x0} {y0} L{x1} {y1} L{x2} {y2}" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M{x0} {y0} L{x1} {y1} L{x2} {y2}" stroke="{color}" stroke-width="31" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    {extra}<circle cx="{x2}" cy="{y2 + 8}" r="18" fill="{mano}" {S}/>
  </g>'''


def tia(p):
    """La tía Elsa. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 296),
    {p}-bd (svgOrigin 250 296, tiene el pañuelo), {p}-boca (escalar, origin 200 236), {p}-ojos,
    {p}-lagrimas (opacity 0), {p}-cabeza, {p}-sombrero."""
    lunares = "".join(f'<circle cx="{x}" cy="{y}" r="7" fill="{M}" opacity="0.85"/>' for x, y in
                      [(160, 330), (232, 350), (190, 400), (150, 450), (246, 430), (200, 500), (140, 540), (260, 520), (196, 580), (240, 600), (160, 610)])
    panu = f'''<g class="{p}-panuelo"><path d="M262 470 Q300 470 316 500 Q300 540 268 548 Q246 520 262 470 Z" fill="{M}" {S}/>
      <path d="M270 490 Q290 500 298 516" stroke="{R}" stroke-width="4" fill="none"/></g>'''
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M178 560 L174 690 M222 560 L226 690" stroke="{K}" stroke-width="38" stroke-linecap="round" fill="none"/>
  <path d="M178 560 L174 690 M222 560 L226 690" stroke="{M}" stroke-width="24" stroke-linecap="round" fill="none"/>
  <ellipse cx="164" cy="700" rx="30" ry="13" fill="{V}" {S}/><ellipse cx="236" cy="700" rx="30" ry="13" fill="{V}" {S}/>
  {_brazo(p + "-bi", 150, 296, 120, 392, 130, 466, A)}
  <path d="M146 282 Q200 266 254 282 L292 630 Q200 650 108 630 Z" fill="{A}" {S}/>
  {lunares}
  <path d="M146 282 Q200 266 254 282 L292 630 Q200 650 108 630 Z" fill="none" {S}/>
  <path d="M164 290 Q200 330 236 290" fill="none" stroke="{M}" stroke-width="9" stroke-dasharray="2 14" stroke-linecap="round"/>
  {_brazo(p + "-bd", 250, 296, 282, 392, 270, 466, A, extra=panu)}
  <rect x="186" y="242" width="28" height="30" fill="{M}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="140" cy="176" r="30" fill="{D}" {S}/><circle cx="260" cy="176" r="30" fill="{D}" {S}/>
    <circle cx="148" cy="226" r="26" fill="{D}" {S}/><circle cx="252" cy="226" r="26" fill="{D}" {S}/>
    <ellipse cx="200" cy="196" rx="60" ry="64" fill="{M}" {S}/>
    <path d="M142 176 Q160 132 200 138 Q240 132 258 176 Q232 156 200 160 Q168 156 142 176 Z" fill="{D}" {S}/>
    <g class="{p}-ojos"><path d="M168 194 Q178 186 188 194 M212 194 Q222 186 232 194" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M166 186 L162 180 M234 186 L238 180" stroke="{K}" stroke-width="4" stroke-linecap="round"/></g>
    <circle cx="178" cy="196" r="19" fill="none" stroke="{K}" stroke-width="4"/><circle cx="222" cy="196" r="19" fill="none" stroke="{K}" stroke-width="4"/>
    <path d="M197 194 H203" stroke="{K}" stroke-width="4"/>
    <circle cx="160" cy="226" r="11" fill="{R}" opacity="0.8"/><circle cx="240" cy="226" r="11" fill="{R}" opacity="0.8"/>
    <ellipse class="{p}-boca" cx="200" cy="236" rx="14" ry="8" fill="{V}" stroke="{K}" stroke-width="4"/>
    <path d="M170 262 Q200 276 230 262" stroke="{M}" stroke-width="9" stroke-dasharray="1 13" stroke-linecap="round" fill="none"/>
    <g class="{p}-lagrimas" opacity="0">
      <path d="M166 214 C160 232 156 246 164 252 C172 256 178 246 174 232 Z" fill="{A}" stroke="{K}" stroke-width="3"/>
      <path d="M234 214 C228 232 224 246 232 252 C240 256 246 246 242 232 Z" fill="{A}" stroke="{K}" stroke-width="3"/>
      <path d="M160 214 Q140 260 150 300 M240 214 Q262 260 252 300" stroke="{A}" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.9"/>
    </g>
    <g class="{p}-sombrero">
      <ellipse cx="196" cy="140" rx="128" ry="30" fill="{R}" {S} transform="rotate(-8 196 140)"/>
      <path d="M140 136 Q140 74 196 72 Q252 74 250 128 Z" fill="{R}" {S}/>
      <path d="M142 122 Q196 136 250 114" stroke="{V}" stroke-width="12" fill="none"/>
      <circle cx="244" cy="104" r="18" fill="{V}" {S}/><circle cx="244" cy="104" r="7" fill="{D}"/>
      <path d="M258 96 Q292 60 300 30" stroke="{K}" stroke-width="4" fill="none"/><path d="M300 30 Q330 56 302 80 Q290 60 300 30 Z" fill="{M}" {S}/>
    </g>
  </g>
</g></svg>'''


def cura(p):
    """El padre. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 296), {p}-bd (svgOrigin 250 296),
    {p}-libreta (en las manos, al frente), {p}-boca (escalar Y, origin 200 240), {p}-cejas, {p}-ojos, {p}-cabeza."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <ellipse cx="166" cy="702" rx="30" ry="12" fill="{K}"/><ellipse cx="234" cy="702" rx="30" ry="12" fill="{K}"/>
  <path d="M146 280 Q200 264 254 280 L300 696 Q200 712 100 696 Z" fill="{M}" {S}/>
  <path d="M180 290 L176 690 M220 290 L224 690" stroke="{K}" stroke-width="4" opacity="0.18"/>
  <path d="M172 284 L164 640 L196 640 L200 300 L204 640 L236 640 L228 284 Z" fill="{D}" {S}/>
  <path d="M180 600 H190 M180 590 V612 M210 600 H220 M215 590 V612" stroke="{V}" stroke-width="5"/>
  <path d="M164 640 L180 664 L196 640 M204 640 L220 664 L236 640" fill="{D}" {S}/>
  {_brazo(p + "-bi", 150, 296, 128, 380, 176, 420, M)}
  {_brazo(p + "-bd", 250, 296, 272, 380, 224, 420, M)}
  <g class="{p}-libreta">
    <rect x="140" y="380" width="120" height="86" rx="8" fill="{V}" {S}/>
    <path d="M200 396 V450 M184 414 H216" stroke="{D}" stroke-width="7" stroke-linecap="round"/>
    <path d="M150 466 H250" stroke="{M}" stroke-width="5"/>
  </g>
  <circle cx="176" cy="428" r="18" fill="{M}" {S}/><circle cx="224" cy="428" r="18" fill="{M}" {S}/>
  <rect x="184" y="244" width="32" height="34" fill="{M}" {S}/>
  <rect x="182" y="262" width="36" height="16" fill="{M}" stroke="{K}" stroke-width="4"/>
  <rect x="192" y="262" width="16" height="16" fill="{M}" stroke="{K}" stroke-width="3"/>
  <g class="{p}-cabeza">
    <circle cx="136" cy="200" r="16" fill="{M}" {S}/><circle cx="264" cy="200" r="16" fill="{M}" {S}/>
    <ellipse cx="200" cy="192" rx="64" ry="72" fill="{M}" {S}/>
    <path d="M138 214 Q130 160 150 150 Q146 190 160 196 Z M262 214 Q270 160 250 150 Q254 190 240 196 Z" fill="#d9d2c4" {S}/>
    <path d="M180 132 Q200 124 220 132" stroke="{K}" stroke-width="4" fill="none" opacity="0.4"/>
    <g class="{p}-ojos"><circle cx="178" cy="198" r="6" fill="{K}"/><circle cx="222" cy="198" r="6" fill="{K}"/></g>
    <circle cx="178" cy="198" r="18" fill="none" stroke="{D}" stroke-width="5"/><circle cx="222" cy="198" r="18" fill="none" stroke="{D}" stroke-width="5"/>
    <path d="M196 196 H204" stroke="{D}" stroke-width="5"/>
    <path class="{p}-cejas" d="M160 172 Q176 164 192 172 M208 172 Q224 164 240 172" stroke="#d9d2c4" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M200 204 Q192 220 202 224" stroke="{K}" stroke-width="4" fill="none"/>
    <circle cx="164" cy="228" r="10" fill="{R}" opacity="0.6"/><circle cx="236" cy="228" r="10" fill="{R}" opacity="0.6"/>
    <ellipse class="{p}-boca" cx="200" cy="242" rx="16" ry="6" fill="{V}" stroke="{K}" stroke-width="4"/>
  </g>
</g></svg>'''


def dueno(p):
    """Ricardo, el dueño de la zapatería. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292),
    {p}-bd (svgOrigin 250 292), {p}-boca (escalar, origin 200 240), {p}-ojos, {p}-cejas, {p}-gotas (opacity 0), {p}-cabeza."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M176 480 L170 684 M224 480 L230 684" stroke="{K}" stroke-width="50" stroke-linecap="round" fill="none"/>
  <path d="M176 480 L170 684 M224 480 L230 684" stroke="#4a3550" stroke-width="36" stroke-linecap="round" fill="none"/>
  <path d="M130 680 Q130 656 168 656 Q194 656 194 694 L130 702 Z M270 680 Q270 656 232 656 Q206 656 206 694 L270 702 Z" fill="{K}" stroke="{M}" stroke-width="3"/>
  {_brazo(p + "-bi", 150, 292, 114, 388, 116, 466, A)}
  {_brazo(p + "-bd", 250, 292, 286, 388, 284, 466, A)}
  <path d="M140 278 Q200 262 260 278 Q278 390 268 494 Q200 508 132 494 Q122 390 140 278 Z" fill="{A}" {S}/>
  <path d="M160 330 L240 330 L250 520 Q200 530 150 520 Z" fill="{V}" {S}/>
  <path d="M160 330 L150 290 M240 330 L250 290" stroke="{V}" stroke-width="8"/>
  <rect x="176" y="380" width="48" height="40" rx="6" fill="none" stroke="{K}" stroke-width="4"/>
  <path d="M184 392 H216" stroke="{D}" stroke-width="5"/>
  <rect x="184" y="242" width="32" height="32" fill="{M}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="134" cy="204" r="15" fill="{M}" {S}/><circle cx="266" cy="204" r="15" fill="{M}" {S}/>
    <ellipse cx="200" cy="196" rx="66" ry="68" fill="{M}" {S}/>
    <path d="M132 176 Q120 120 160 118 Q150 96 190 104 Q206 84 230 104 Q270 96 262 128 Q284 140 268 180 Q256 150 230 146 Q210 160 188 146 Q160 156 132 176 Z" fill="{V}" {S}/>
    <path d="M200 104 Q214 70 236 76 M172 112 Q164 84 146 86" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <g class="{p}-ojos"><circle cx="176" cy="194" r="12" fill="{M}" stroke="{K}" stroke-width="4"/><circle cx="224" cy="194" r="12" fill="{M}" stroke="{K}" stroke-width="4"/>
      <circle cx="176" cy="196" r="5" fill="{K}"/><circle cx="224" cy="196" r="5" fill="{K}"/></g>
    <path class="{p}-cejas" d="M156 170 L192 176 M208 176 L244 170" stroke="{K}" stroke-width="9" stroke-linecap="round"/>
    <path d="M200 200 Q192 216 202 220" stroke="{K}" stroke-width="4" fill="none"/>
    <path d="M164 232 Q182 218 200 226 Q218 218 236 232 Q218 236 200 232 Q182 236 164 232 Z" fill="{V}" {S}/>
    <ellipse class="{p}-boca" cx="200" cy="250" rx="18" ry="10" fill="{K}"/>
    <g class="{p}-gotas" opacity="0">
      <path d="M268 140 C262 156 258 168 266 172 C274 176 278 166 274 154 Z" fill="{A}" stroke="{K}" stroke-width="3"/>
      <path d="M128 150 C122 166 118 178 126 182 C134 186 138 176 134 164 Z" fill="{A}" stroke="{K}" stroke-width="3"/>
    </g>
  </g>
</g></svg>'''


def novia(p):
    """Lucía, la clienta vestida de novia. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 152 296,
    tiene el ramo), {p}-bd (svgOrigin 248 296), {p}-boca (escalar, origin 200 240), {p}-cejas, {p}-ojos, {p}-velo, {p}-cabeza, {p}-ramo."""
    ramo = f'''<g class="{p}-ramo"><path d="M120 470 L106 540 M132 472 L132 544 M144 470 L156 538" stroke="{K}" stroke-width="5"/>
      <circle cx="110" cy="458" r="20" fill="{R}" {S}/><circle cx="150" cy="456" r="20" fill="{V}" {S}/><circle cx="130" cy="436" r="20" fill="{D}" {S}/>
      <circle cx="130" cy="470" r="18" fill="{M}" {S}/><circle cx="110" cy="458" r="6" fill="{V}"/><circle cx="130" cy="436" r="6" fill="{V}"/></g>'''
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path class="{p}-velo" d="M150 150 Q90 300 70 520 Q120 560 170 520 Q160 330 200 170 Z" fill="{M}" opacity="0.55" {S}/>
  <path d="M154 430 Q120 560 48 700 Q200 726 352 700 Q280 560 246 430 Z" fill="{M}" {S}/>
  <path d="M120 560 Q200 580 280 560 M90 640 Q200 664 310 640" stroke="{R}" stroke-width="8" fill="none"/>
  <path d="M154 430 Q120 560 48 700 Q200 726 352 700 Q280 560 246 430 Z" fill="none" {S}/>
  <path d="M150 290 Q200 274 250 290 L248 440 Q200 452 152 440 Z" fill="{M}" {S}/>
  <path d="M152 432 Q200 448 248 432" stroke="{R}" stroke-width="12" fill="none"/>
  <path d="M168 296 Q200 330 232 296" stroke="{R}" stroke-width="5" fill="none"/>
  {_brazo(p + "-bi", 152, 296, 122, 388, 130, 456, M, extra="")}
  {_brazo(p + "-bd", 248, 296, 280, 388, 270, 456, M)}
  {ramo}
  <rect x="186" y="244" width="28" height="34" fill="{M}" {S}/>
  <g class="{p}-cabeza">
    <path d="M140 210 Q120 120 200 112 Q280 120 260 210 Q270 250 250 270 L150 270 Q130 250 140 210 Z" fill="{V}" {S}/>
    <circle cx="200" cy="104" r="34" fill="{V}" {S}/>
    <ellipse cx="200" cy="198" rx="58" ry="64" fill="{M}" {S}/>
    <path d="M142 186 Q150 136 200 138 Q252 136 258 186 Q240 158 214 156 Q190 166 160 162 Q148 172 142 186 Z" fill="{V}" {S}/>
    <path d="M150 140 L166 112 L184 132 L200 104 L216 132 L234 112 L250 140 Z" fill="{D}" {S}/>
    <circle cx="200" cy="114" r="6" fill="{R}"/>
    <g class="{p}-ojos"><circle cx="178" cy="198" r="7" fill="{K}"/><circle cx="222" cy="198" r="7" fill="{K}"/>
      <path d="M168 192 L162 186 M232 192 L238 186" stroke="{K}" stroke-width="4" stroke-linecap="round"/></g>
    <path class="{p}-cejas" d="M162 176 L192 182 M208 182 L238 176" stroke="{K}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="160" cy="224" r="11" fill="{R}" opacity="0.85"/><circle cx="240" cy="224" r="11" fill="{R}" opacity="0.85"/>
    <ellipse class="{p}-boca" cx="200" cy="238" rx="14" ry="7" fill="{V}" stroke="{K}" stroke-width="4"/>
  </g>
</g></svg>'''


def novio(p):
    """El de enfrente, el novio canchero. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292),
    {p}-bd (svgOrigin 250 292), {p}-boca (sonrisa), {p}-ojos, {p}-guino (opacity 0: ojo derecho cerrado), {p}-ojod (ojo derecho abierto), {p}-cabeza."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M176 480 L170 684 M224 480 L230 684" stroke="{K}" stroke-width="50" stroke-linecap="round" fill="none"/>
  <path d="M176 480 L170 684 M224 480 L230 684" stroke="{A}" stroke-width="36" stroke-linecap="round" fill="none"/>
  <path d="M130 680 Q130 656 168 656 Q194 656 194 694 L130 702 Z M270 680 Q270 656 232 656 Q206 656 206 694 L270 702 Z" fill="{K}" stroke="{M}" stroke-width="3"/>
  {_brazo(p + "-bi", 150, 292, 116, 388, 120, 466, A)}
  {_brazo(p + "-bd", 250, 292, 284, 388, 280, 466, A)}
  <path d="M138 278 Q200 262 262 278 Q280 390 270 500 Q200 514 130 500 Q120 390 138 278 Z" fill="{A}" {S}/>
  <path d="M176 278 L200 420 L224 278 Z" fill="{M}" {S}/>
  <path d="M176 278 L196 390 L150 320 Z M224 278 L204 390 L250 320 Z" fill="{A}" {S}/>
  <path d="M180 290 L200 302 L220 290 L220 316 L200 304 L180 316 Z" fill="{D}" {S}/>
  <circle cx="240" cy="340" r="14" fill="{R}" {S}/><circle cx="240" cy="340" r="5" fill="{V}"/>
  <circle cx="200" cy="440" r="6" fill="{K}"/><circle cx="200" cy="470" r="6" fill="{K}"/>
  <rect x="184" y="242" width="32" height="32" fill="{M}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="134" cy="204" r="15" fill="{M}" {S}/><circle cx="266" cy="204" r="15" fill="{M}" {S}/>
    <path d="M136 200 Q132 240 200 268 Q268 240 264 200 L264 150 L136 150 Z" fill="{M}" {S}/>
    <path d="M134 180 Q120 110 190 96 Q250 70 286 110 Q250 100 236 112 Q270 130 266 178 Q250 140 200 140 Q160 140 134 180 Z" fill="{K}" stroke="{K}" stroke-width="4"/>
    <path d="M170 110 Q210 92 250 102" stroke="{M}" stroke-width="5" fill="none" opacity="0.5" stroke-linecap="round"/>
    <g class="{p}-ojos"><path d="M164 192 Q176 184 188 192" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <ellipse class="{p}-ojod" cx="224" cy="194" rx="7" ry="8" fill="{K}"/>
      <path class="{p}-guino" d="M212 196 Q224 186 236 196" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/></g>
    <path d="M160 172 L190 176 M210 170 L240 162" stroke="{K}" stroke-width="7" stroke-linecap="round"/>
    <path d="M200 200 Q192 216 202 220" stroke="{K}" stroke-width="4" fill="none"/>
    <path class="{p}-boca" d="M176 234 Q206 256 232 228 Q210 240 176 234 Z" fill="{K}" stroke="{K}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M190 238 L222 236" stroke="{M}" stroke-width="5"/>
  </g>
</g></svg>'''


def anillos(p, w=300):
    """Dos anillos dorados entrelazados con brillante. viewBox 300x220. Clases {p}-a1, {p}-a2, {p}-brillo."""
    return f'''<svg viewBox="0 0 300 220" aria-hidden="true">
  <circle class="{p}-a1" cx="112" cy="128" r="70" fill="none" stroke="{K}" stroke-width="34"/><circle cx="112" cy="128" r="70" fill="none" stroke="{D}" stroke-width="20"/>
  <circle class="{p}-a2" cx="188" cy="128" r="70" fill="none" stroke="{K}" stroke-width="34"/><circle cx="188" cy="128" r="70" fill="none" stroke="{D}" stroke-width="20"/>
  <path d="M150 70 A70 70 0 0 1 182 58" stroke="{D}" stroke-width="20" fill="none"/>
  <path class="{p}-brillo" d="M188 20 L214 44 L188 72 L162 44 Z" fill="{M}" {S}/>
  <path d="M120 110 Q114 96 124 86" stroke="{M}" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>'''


def arco(p):
    """Arco de flores del altar. viewBox 900x900 (arco de x 60 a 840, columnas hasta y 900). Clases {p}-flor (cada flor)."""
    flores = []
    import math
    for i in range(19):
        a = math.pi - i * math.pi / 18
        x, y = 450 + 380 * math.cos(a), 430 - 380 * math.sin(a)
        c = [R, M, V, D][i % 4]
        flores.append(f'<g class="{p}-flor"><circle cx="{x:.0f}" cy="{y:.0f}" r="{34 if i % 2 else 28}" fill="{c}" {S}/><circle cx="{x:.0f}" cy="{y:.0f}" r="9" fill="{D if c != D else V}"/></g>')
    for side in (70, 830):
        for j in range(5):
            c = [R, M, V][j % 3]
            flores.append(f'<g class="{p}-flor"><circle cx="{side + (8 if j % 2 else -8)}" cy="{500 + j * 90}" r="26" fill="{c}" {S}/><circle cx="{side + (8 if j % 2 else -8)}" cy="{500 + j * 90}" r="8" fill="{D}"/></g>')
    return f'''<svg viewBox="0 0 900 900" aria-hidden="true">
  <path d="M70 900 V430 A380 380 0 0 1 830 430 V900" fill="none" stroke="{K}" stroke-width="40"/>
  <path d="M70 900 V430 A380 380 0 0 1 830 430 V900" fill="none" stroke="{D}" stroke-width="24"/>
  {"".join(flores)}
</svg>'''


def puertas(p):
    """Puerta doble de iglesia en arco. viewBox 600x800. Clases {p}-pi (hoja izquierda, svgOrigin 60 800), {p}-pd (hoja derecha, svgOrigin 540 800)."""
    def hoja(cls, x0, x1):
        tablas = "".join(f'<path d="M{x0 + 30} {y} H{x1 - 30}" stroke="{K}" stroke-width="5" opacity="0.5"/>' for y in range(320, 780, 70))
        return f'<g class="{cls}"><path d="M{x0} 800 V300 Q{x0} 60 300 60 L300 800 Z" transform="{"" if x0 < 300 else "translate(600 0) scale(-1 1)"}" fill="{V}" {S}/>{tablas}<circle cx="{x1 - 34 if x0 < 300 else x0 + 34}" cy="520" r="14" fill="{D}" {S}/></g>'
    return f'''<svg viewBox="0 0 600 800" aria-hidden="true">
  <path d="M40 800 V300 Q40 30 300 30 Q560 30 560 300 V800" fill="none" stroke="{K}" stroke-width="40"/>
  <path d="M40 800 V300 Q40 30 300 30 Q560 30 560 300 V800" fill="none" stroke="{D}" stroke-width="22"/>
  <path class="{p}-luz" d="M60 800 V300 Q60 60 300 60 Q540 60 540 300 V800 Z" fill="{M}"/>
  {hoja(p + "-pi", 60, 300)}
  {hoja(p + "-pd", 300, 540)}
</svg>'''


def pulgar(p):
    """Mano con el pulgar arriba (dibujada, no emoji). viewBox 300x340."""
    return f'''<svg viewBox="0 0 300 340" aria-hidden="true">
  <path d="M60 170 L120 170 L150 60 Q160 20 190 34 Q212 46 200 96 L190 150 L260 150 Q290 152 284 186 Q296 200 282 222 Q294 240 274 258 Q284 280 258 292 L120 296 L60 296 Z" fill="{D}" {S}/>
  <path d="M200 196 H272 M204 236 H268 M206 270 H254" stroke="{K}" stroke-width="6" stroke-linecap="round"/>
  <rect x="16" y="160" width="62" height="150" rx="10" fill="{V}" {S}/>
</svg>'''


def botas(p):
    """Un par de botas de mujer, talle 38. viewBox 340x320."""
    def bota(x, c):
        return f'<path d="M{x} 30 H{x + 70} V210 Q{x + 70} 240 {x + 110} 248 Q{x + 150} 256 {x + 150} 290 L{x} 290 Z" fill="{c}" {S}/><path d="M{x} 270 H{x + 150}" stroke="{K}" stroke-width="6"/><path d="M{x + 10} 60 H{x + 60}" stroke="{D}" stroke-width="8"/>'
    return f'''<svg viewBox="0 0 340 320" aria-hidden="true">{bota(20, V)}{bota(160, V)}
  <circle class="{p}-talle" cx="96" cy="150" r="40" fill="{M}" {S}/><text x="96" y="166" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="44" fill="{K}">38</text></svg>'''


def torta(p):
    """Torta de bodas de tres pisos. viewBox 400x460. Clase {p}-novios (muñequitos de arriba)."""
    return f'''<svg viewBox="0 0 400 460" aria-hidden="true">
  <rect x="40" y="320" width="320" height="120" rx="12" fill="{M}" {S}/>
  <path d="M40 350 Q80 380 120 350 Q160 380 200 350 Q240 380 280 350 Q320 380 360 350" stroke="{R}" stroke-width="10" fill="none"/>
  <rect x="80" y="220" width="240" height="100" rx="12" fill="{M}" {S}/>
  <path d="M80 248 Q120 274 160 248 Q200 274 240 248 Q280 274 320 248" stroke="{D}" stroke-width="9" fill="none"/>
  <rect x="120" y="130" width="160" height="90" rx="12" fill="{M}" {S}/>
  <path d="M120 156 Q160 180 200 156 Q240 180 280 156" stroke="{R}" stroke-width="8" fill="none"/>
  <rect x="20" y="436" width="360" height="16" rx="8" fill="{D}" {S}/>
  <g class="{p}-novios"><circle cx="176" cy="60" r="16" fill="{M}" {S}/><path d="M160 130 L166 80 L186 80 L192 130 Z" fill="{A}" {S}/>
    <circle cx="224" cy="60" r="16" fill="{M}" {S}/><path d="M204 130 L214 80 L234 80 L246 130 Z" fill="{M}" {S}/><path d="M212 50 Q224 36 238 52" stroke="{V}" stroke-width="10" fill="none"/></g>
</svg>'''


def destello(cls, x, y, r, color=D):
    k = r * 0.26
    return f'<path class="{cls}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}" stroke="{K}" stroke-width="4"/>'


def corazon(cls, x, y, s=1, color=R):
    return f'<path class="{cls}" transform="translate({x} {y}) scale({s})" d="M0 30 C-50 -6 -34 -50 0 -24 C34 -50 50 -6 0 30 Z" fill="{color}" stroke="{K}" stroke-width="{5 / s:.1f}"/>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Cormorant"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 400px; height: 720px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap;
      letter-spacing: -0.02em; -webkit-text-stroke: 12px #2a1220; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .big.m { color: #fbf4e6; text-shadow: 9px 9px 0 #9b2445; }
    [data-composition-id="%ID%"] .big.d { color: #e3b448; text-shadow: 9px 9px 0 #9b2445; }
    [data-composition-id="%ID%"] .big.r { color: #eba5b3; text-shadow: 9px 9px 0 #2a1220; }
    [data-composition-id="%ID%"] .big.a { color: #5b8ee0; text-shadow: 9px 9px 0 #2a1220; }
    [data-composition-id="%ID%"] .big.v { color: #9b2445; text-shadow: 9px 9px 0 #e3b448; }
    [data-composition-id="%ID%"] .big.g { color: #5ce611; text-shadow: 8px 8px 0 #2a1220; }
    [data-composition-id="%ID%"] .script { position: absolute; left: 0; right: 0; text-align: center; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; color: #e3b448; white-space: nowrap; line-height: 1; }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 18px 46px 10px; border: 12px solid currentColor; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #2a1220; }
    [data-composition-id="%ID%"] .centro { left: 0; right: 0; margin-left: auto; margin-right: auto; width: max-content; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 22px 32px; border-radius: 30px; border: 6px solid #2a1220; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.12; white-space: nowrap; color: #2a1220; background: #fbf4e6; box-shadow: 8px 8px 0 #2a1220; }
    [data-composition-id="%ID%"] .cel { position: absolute; border-radius: 52px; border: 8px solid #2a1220; background: #2a1220; box-shadow: 0 0 0 6px #e3b448, 12px 12px 0 6px #2a1220; }
    [data-composition-id="%ID%"] .cel .barra { position: absolute; left: 50%; top: 14px; width: 110px; height: 22px; margin-left: -55px; border-radius: 12px; background: #2a1220; z-index: 2; }
    [data-composition-id="%ID%"] .cel .pant { position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: 44px; background: #fbf4e6; overflow: hidden; }
    [data-composition-id="%ID%"] .cel .head { position: absolute; left: 0; right: 0; top: 0; height: 130px; background: #9b2445; border-bottom: 5px solid #2a1220; }
    [data-composition-id="%ID%"] .cel .head b { position: absolute; left: 110px; top: 50px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; color: #fbf4e6; white-space: nowrap; }
    [data-composition-id="%ID%"] .cel .head small { position: absolute; left: 110px; top: 88px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; color: #eba5b3; white-space: nowrap; }
    [data-composition-id="%ID%"] .cel .head i { position: absolute; left: 30px; top: 50px; width: 64px; height: 64px; border-radius: 50%; background: #eba5b3; border: 4px solid #2a1220; }
    [data-composition-id="%ID%"] .msg { position: absolute; max-width: 80%; padding: 14px 20px 12px; border-radius: 22px; border: 4px solid #2a1220; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 30px; line-height: 1.18; color: #2a1220; }
    [data-composition-id="%ID%"] .msg.yo { right: 18px; background: #eba5b3; border-bottom-right-radius: 6px; }
    [data-composition-id="%ID%"] .msg.el { left: 18px; background: #ffffff; border-bottom-left-radius: 6px; }
    [data-composition-id="%ID%"] .msg small { display: block; margin-top: 4px; text-align: right; font-family: "IBM Plex Mono", monospace; font-size: 20px; font-weight: 600; opacity: 0.65; }
"""

JS_COMUN = """
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      // golpe: algo que cae de grande en su palabra
      const golpe = (el, t, rot = -4, sc = 2.6) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: sc, rotation: rot * 3 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.12); };
      const pop = (el, t, d = 0.35, extra = {}) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 0.6 }, Object.assign({ opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, extra), t); };
      const fuera = (el, t, d = 0.18) => tl.to(el, { opacity: 0, scale: 0.85, duration: d, ease: "power2.in" }, t);
      const entra = (el, t, desde = { x: -700 }, d = 0.35) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, Object.assign({ opacity: 1 }, desde), { opacity: 1, x: 0, y: 0, duration: d, ease: "back.out(1.3)", immediateRender: false }, t); };
      const sacudon = (t, f = 1) => [[-14 * f, 8 * f], [10 * f, -6 * f], [-5 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(q(".esc"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      // boca que habla de t a t+d
      const habla = (sel, t, d, origin) => tl.fromTo(q(sel), { scaleY: 1, svgOrigin: origin }, { scaleY: 1.9, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }, t);
      // respira / rebota suave
      const vaiven = (el, t, d, vars, per = 0.4) => tl.to(el, Object.assign({ duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)) | 1, ease: "sine.inOut" }, vars), t);
"""


def escena(sid, p, dur, css, body, js, sfx):
    html = f"""<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>{CSS_COMUN.replace('%ID%', sid).replace('%P%', p)}{css.replace('%ID%', sid)}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-duration="{dur}">
    <div id="{p}-escena" class="{p}-capa clip" data-start="0" data-duration="{dur}" data-track-index="0">
      <div class="{p}-esc esc">
{body}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{sid}";
      const DUR = {dur};{JS_COMUN}
{js}
      // salida
      tl.to(q("#{p}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }}, DUR - 0.2);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
"""
    open(os.path.join(OUT, sid + ".html"), "w").write(html)
    open(os.path.join(OUT, sid + ".sfx.json"), "w").write("[\n" + ",\n".join("  " + json.dumps(s, ensure_ascii=False) for s in sfx) + "\n]\n")


def celular(p, w, h, nombre, estado, mensajes):
    """Celular con un chat. mensajes: [(clase extra, 'yo'|'el', texto, hora, top)]. Devuelve html."""
    ms = "".join(f'<div class="msg {lado} {cls}" style="top:{top}px">{txt}<small>{hora}</small></div>' for cls, lado, txt, hora, top in mensajes)
    return f'<div class="cel {p}-cel" style="width:{w}px;height:{h}px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>{nombre}</b><small>{estado}</small></div>{ms}</div></div>'
