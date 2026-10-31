# Helpers para generar las escenas de reels/talle-unico (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
# Correr: cd partes/escenas && python3 sNN.py   (después node armar.mjs desde reels/talle-unico)
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
K, W, F, D, G, GL, V = "#0e0c10", "#f6f1ea", "#ff2e88", "#d8b25c", "#8d8892", "#c9c4cc", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'
SG = f'stroke="{G}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"'


def _pierna(color, x1, x2, y1=470, y2=680, ancho=32):
    return (f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{K}" stroke-width="{ancho + 14}" stroke-linecap="round" fill="none"/>'
            f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{color}" stroke-width="{ancho}" stroke-linecap="round" fill="none"/>')


def _brazo(cls, color, a, b, c, mano=W, extra="", ancho=32):
    pts = f"M{a[0]} {a[1]} L{b[0]} {b[1]} L{c[0]} {c[1]}"
    return (f'<g class="{cls}"><path d="{pts}" stroke="{K}" stroke-width="{ancho + 12}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
            f'<path d="{pts}" stroke="{color}" stroke-width="{ancho}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>{extra}'
            f'<circle cx="{c[0]}" cy="{c[1] + 8}" r="18" fill="{mano}" {S}/></g>')


def critica(p):
    """Bárbara Lamé. SVG 400x720, pies y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292, libreta dorada),
    {p}-bd (svgOrigin 250 292, lapicera fucsia), {p}-boca (escalar, origin 200 240), {p}-gafas (bajar y +24 para
    mirar por encima), {p}-ojos, {p}-ceja, {p}-cabeza (origin 200 250)."""
    libreta = f'<g class="{p}-libreta"><rect x="74" y="430" width="80" height="104" rx="6" fill="{D}" {S}/><path d="M86 456 H142 M86 474 H142 M86 492 H130" stroke="{K}" stroke-width="4"/></g>'
    lapiz = f'<path d="M286 470 L330 400" stroke="{K}" stroke-width="16" stroke-linecap="round"/><path d="M286 470 L330 400" stroke="{F}" stroke-width="8" stroke-linecap="round"/>'
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  {_pierna(K, 184, 178, 520, 676, 24)}{_pierna(K, 216, 222, 520, 676, 24)}
  <path d="M150 690 L190 690 L196 676 L170 668 Z M210 690 L250 690 L230 668 L204 676 Z" fill="{F}" {S}/>
  <path d="M176 690 L172 712 M224 690 L228 712" stroke="{F}" stroke-width="6"/>
  {_brazo(p + "-bi", W, (150, 292), (116, 390), (118, 466), extra=libreta, ancho=24)}
  {_brazo(p + "-bd", W, (250, 292), (284, 390), (282, 466), extra=lapiz, ancho=24)}
  <path d="M146 280 Q200 266 254 280 L262 450 Q300 600 318 670 Q200 690 82 670 Q100 600 138 450 Z" fill="{K}" stroke="{D}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M146 280 Q200 330 254 280" fill="none" stroke="{D}" stroke-width="5"/>
  <path d="M136 448 Q200 462 264 448" stroke="{D}" stroke-width="14" fill="none"/>
  <path d="M232 470 Q250 580 276 668" stroke="{G}" stroke-width="4" fill="none" opacity="0.6"/>
  <rect x="188" y="238" width="24" height="34" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <path d="M122 150 Q122 92 200 90 Q278 92 278 150 L286 268 Q240 276 228 250 L172 250 Q160 276 114 268 Z" fill="{K}" stroke="{G}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="200" cy="190" rx="58" ry="66" fill="{W}" {S}/>
    <circle cx="140" cy="214" r="10" fill="{D}" {S}/><circle cx="260" cy="214" r="10" fill="{D}" {S}/>
    <g class="{p}-ojos"><path d="M166 196 Q178 186 190 196" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M210 196 Q222 186 234 196" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <circle cx="178" cy="198" r="5" fill="{K}"/><circle cx="222" cy="198" r="5" fill="{K}"/></g>
    <path class="{p}-ceja" d="M162 170 L192 178 M208 178 L238 170" stroke="{K}" stroke-width="7" stroke-linecap="round"/>
    <path class="{p}-boca" d="M182 236 Q200 228 218 236 Q200 252 182 236 Z" fill="{F}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M134 168 Q132 106 200 104 Q268 106 266 168 Q234 150 200 152 Q166 150 134 168 Z" fill="{K}" stroke="{G}" stroke-width="5" stroke-linejoin="round"/>
    <g class="{p}-gafas">
      <path d="M144 184 Q146 170 176 172 Q196 174 194 192 Q190 212 170 212 Q150 210 146 198 L132 178 Z" fill="{K}" stroke="{D}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M256 184 Q254 170 224 172 Q204 174 206 192 Q210 212 230 212 Q250 210 254 198 L268 178 Z" fill="{K}" stroke="{D}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M194 186 Q200 182 206 186" stroke="{D}" stroke-width="4" fill="none"/>
      <path d="M156 186 L166 180 M216 186 L226 180" stroke="{F}" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
</g></svg>'''


def presentador(p):
    """Tito Lentejuela. SVG 400x720. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292), {p}-bd (svgOrigin 250 292, micrófono),
    {p}-boca (origin 200 236), {p}-cabeza."""
    mic = f'<g><rect x="272" y="420" width="20" height="60" rx="6" fill="{K}" stroke="{G}" stroke-width="4"/><circle cx="282" cy="410" r="20" fill="{D}" {S}/></g>'
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  {_pierna("#2a2530", 176, 170)}{_pierna("#2a2530", 224, 230)}
  <ellipse cx="160" cy="700" rx="34" ry="14" fill="{K}" stroke="{G}" stroke-width="4"/><ellipse cx="240" cy="700" rx="34" ry="14" fill="{K}" stroke="{G}" stroke-width="4"/>
  {_brazo(p + "-bi", "#2a2530", (150, 292), (116, 390), (118, 466))}
  {_brazo(p + "-bd", "#2a2530", (250, 292), (284, 390), (282, 466), extra=mic)}
  <path d="M140 278 Q200 262 260 278 L272 500 L128 500 Z" fill="#2a2530" stroke="{K}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M176 276 L200 380 L224 276 Z" fill="{W}" {S}/>
  <path d="M176 276 L200 380 L150 300 Z M224 276 L200 380 L250 300 Z" fill="#2a2530" stroke="{G}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M174 276 L200 288 L226 276 L226 304 L200 292 L174 304 Z" fill="{F}" {S}/>
  <circle cx="200" cy="420" r="6" fill="{D}"/><circle cx="200" cy="450" r="6" fill="{D}"/>
  <rect x="186" y="238" width="28" height="30" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="200" cy="190" rx="60" ry="66" fill="{W}" {S}/>
    <circle cx="140" cy="200" r="14" fill="{W}" {S}/><circle cx="260" cy="200" r="14" fill="{W}" {S}/>
    <path d="M136 170 Q120 96 200 86 Q300 80 276 160 Q262 120 210 124 Q170 124 150 150 Z" fill="{D}" {S}/>
    <path d="M190 100 Q230 90 260 110" stroke="{W}" stroke-width="6" fill="none" opacity="0.6" stroke-linecap="round"/>
    <circle cx="178" cy="190" r="7" fill="{K}"/><circle cx="222" cy="190" r="7" fill="{K}"/>
    <path d="M164 172 L190 168 M210 168 L236 172" stroke="{K}" stroke-width="5" stroke-linecap="round"/>
    <path class="{p}-boca" d="M170 222 Q200 260 230 222 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M176 225 H224" stroke="{W}" stroke-width="7"/>
  </g>
</g></svg>'''


def hugo(p, tag=True):
    """Don Hugo, ferretero, con un buzo gris talle único que le queda CHICO (panza afuera, mangas cortas).
    SVG 400x720. Clases: {p}-cuerpo, {p}-bi (svgOrigin 148 300), {p}-bd (svgOrigin 252 300), {p}-boca (origin 200 246),
    {p}-cabeza, {p}-panza, {p}-tag, {p}-costura (líneas de tensión)."""
    tg = f'''<g class="{p}-tag"><path d="M226 300 L250 360" stroke="{D}" stroke-width="3"/>
      <path d="M232 356 L280 352 L292 392 L246 404 Z" fill="{D}" {S}/><circle cx="246" cy="366" r="5" fill="{K}"/>
      <text data-layout-ignore x="268" y="386" text-anchor="middle" transform="rotate(-8 268 386)" font-family="IBM Plex Mono" font-weight="600" font-size="15" fill="{K}">ÚNICO</text></g>''' if tag else ""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  {_pierna("#2a2530", 172, 166, 480, 680, 40)}{_pierna("#2a2530", 228, 234, 480, 680, 40)}
  <path d="M126 676 Q126 652 166 652 Q194 652 194 690 L126 702 Z M274 676 Q274 652 234 652 Q206 652 206 690 L274 702 Z" fill="{G}" {S}/>
  {_brazo(p + "-bi", W, (148, 300), (108, 390), (112, 466), ancho=34)}
  {_brazo(p + "-bd", W, (252, 300), (292, 390), (288, 466), ancho=34)}
  <path d="M146 300 L118 352 L102 344 Z M254 300 L282 352 L298 344 Z" fill="{G}" {S}/>
  <g class="{p}-panza"><path d="M134 380 Q110 470 150 500 Q200 520 250 500 Q290 470 266 380 Z" fill="{W}" {S}/>
    <path d="M196 450 Q202 456 196 462" stroke="{K}" stroke-width="5" fill="none"/></g>
  <path d="M138 286 Q200 270 262 286 Q274 340 270 398 Q200 414 130 398 Q126 340 138 286 Z" fill="{G}" {S}/>
  <path d="M130 392 Q200 408 270 392" stroke="{K}" stroke-width="5" fill="none" opacity="0.5"/>
  <g class="{p}-costura"><path d="M150 330 L170 336 M230 336 L250 330 M158 360 L180 362 M220 362 L242 360" stroke="{K}" stroke-width="4" stroke-linecap="round" opacity="0.55"/></g>
  <path d="M138 286 Q200 270 262 286 Q200 300 138 286 Z" fill="{G}" {S}/>
  <rect x="184" y="246" width="32" height="34" fill="{W}" {S}/>
  {tg}
  <g class="{p}-cabeza">
    <ellipse cx="200" cy="194" rx="66" ry="68" fill="{W}" {S}/>
    <path d="M134 210 Q130 160 146 150 L150 200 Z M266 210 Q270 160 254 150 L250 200 Z" fill="{G}" {S}/>
    <circle cx="134" cy="206" r="14" fill="{W}" {S}/><circle cx="266" cy="206" r="14" fill="{W}" {S}/>
    <path d="M170 140 Q200 130 230 140" stroke="{K}" stroke-width="4" fill="none" opacity="0.35"/>
    <circle cx="176" cy="190" r="7" fill="{K}"/><circle cx="224" cy="190" r="7" fill="{K}"/>
    <path class="{p}-ceja" d="M158 168 L192 176 M208 176 L242 168" stroke="{G}" stroke-width="10" stroke-linecap="round"/>
    <path d="M200 194 Q192 212 200 216" stroke="{K}" stroke-width="4" fill="none"/>
    <ellipse class="{p}-boca" cx="200" cy="246" rx="14" ry="7" fill="{K}"/>
    <path d="M156 232 Q180 214 200 226 Q220 214 244 232 Q222 238 200 232 Q178 238 156 232 Z" fill="{G}" {S}/>
  </g>
</g></svg>'''


def panadera(p, abrigo=True):
    """La panadera con un tapado gris ENORME (talle único que le queda grande). SVG 400x720.
    Clases: {p}-cuerpo, {p}-abrigo, {p}-mangas (manga que cuelga), {p}-boca (origin 200 236), {p}-cabeza, {p}-gorro."""
    ab = f'''<g class="{p}-abrigo">
    <path d="M60 300 Q200 250 340 300 L372 560 Q392 700 404 716 L-4 716 Q8 700 28 560 Z" fill="{G}" {S}/>
    <path d="M200 286 L200 716" stroke="{K}" stroke-width="5"/>
    <circle cx="220" cy="380" r="9" fill="{K}"/><circle cx="220" cy="460" r="9" fill="{K}"/><circle cx="220" cy="540" r="9" fill="{K}"/>
    <path d="M150 286 L200 380 L250 286" fill="{G}" {S}/>
    <g class="{p}-mangas"><path d="M64 304 Q10 420 20 650 L92 656 Q86 470 112 360 Z" fill="{G}" {S}/>
      <path d="M336 304 Q390 420 380 650 L308 656 Q314 470 288 360 Z" fill="{G}" {S}/>
      <path d="M22 610 L90 614 M378 610 L310 614" stroke="{K}" stroke-width="4" opacity="0.5"/></g>
    <path d="M40 716 Q80 700 120 716 M280 716 Q320 700 360 716" stroke="{K}" stroke-width="4" fill="none" opacity="0.5"/>
  </g>''' if abrigo else ""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  {_pierna(W, 180, 176, 500, 680, 26)}{_pierna(W, 220, 224, 500, 680, 26)}
  <ellipse cx="168" cy="700" rx="30" ry="13" fill="{K}" stroke="{G}" stroke-width="4"/><ellipse cx="232" cy="700" rx="30" ry="13" fill="{K}" stroke="{G}" stroke-width="4"/>
  <path d="M144 284 Q200 270 256 284 L266 520 L134 520 Z" fill="{W}" {S}/>
  {ab}
  <rect x="186" y="238" width="28" height="34" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="200" cy="194" rx="58" ry="62" fill="{W}" {S}/>
    <path d="M144 196 Q140 150 168 140 L232 140 Q260 150 256 196 Q240 160 200 160 Q160 160 144 196 Z" fill="{D}" {S}/>
    <g class="{p}-gorro"><path d="M150 150 Q120 80 160 70 Q170 30 200 40 Q230 30 240 70 Q280 80 250 150 Z" fill="{W}" {S}/>
      <rect x="148" y="136" width="104" height="26" rx="6" fill="{W}" {S}/></g>
    <circle cx="178" cy="196" r="7" fill="{K}"/><circle cx="222" cy="196" r="7" fill="{K}"/>
    <circle cx="160" cy="218" r="10" fill="{F}" opacity="0.4"/><circle cx="240" cy="218" r="10" fill="{F}" opacity="0.4"/>
    <ellipse class="{p}-boca" cx="200" cy="232" rx="13" ry="9" fill="{K}"/>
  </g>
</g></svg>'''


def laura(p):
    """Laura, dueña de la tienda con dos locales: vestido fucsia, cola de caballo dorada, UN ZAPATO DE CADA PAR
    (izquierdo stiletto fucsia, derecho bota de lluvia gris). SVG 400x720. Clases: {p}-cuerpo, {p}-bi (svgOrigin 152 300),
    {p}-bd (svgOrigin 248 300), {p}-boca (origin 200 236), {p}-cabeza, {p}-cola (origin 250 130), {p}-zi, {p}-zd."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  {_pierna(W, 180, 172, 500, 676, 24)}{_pierna(W, 220, 228, 500, 640, 24)}
  <g class="{p}-zi"><path d="M134 692 L176 692 L186 672 L158 664 Z" fill="{F}" {S}/><path d="M140 692 L136 714" stroke="{F}" stroke-width="7"/></g>
  <g class="{p}-zd"><path d="M206 620 L250 620 L252 690 L280 690 Q290 712 270 714 L206 714 Z" fill="{G}" {S}/><path d="M206 640 H250" stroke="{K}" stroke-width="4"/></g>
  {_brazo(p + "-bi", F, (152, 300), (120, 396), (126, 468), ancho=26)}
  {_brazo(p + "-bd", F, (248, 300), (280, 396), (274, 468), ancho=26)}
  <path d="M144 284 Q200 270 256 284 L262 440 Q300 520 300 560 Q200 580 100 560 Q100 520 138 440 Z" fill="{F}" {S}/>
  <path d="M138 440 Q200 452 262 440" stroke="{K}" stroke-width="6" fill="none"/>
  <rect x="188" y="240" width="24" height="34" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <path class="{p}-cola" d="M250 120 Q330 120 320 220 Q312 280 290 300 Q300 220 252 160 Z" fill="{D}" {S}/>
    <ellipse cx="200" cy="192" rx="58" ry="64" fill="{W}" {S}/>
    <path d="M140 190 Q136 116 200 112 Q264 116 260 190 Q246 140 200 142 Q160 144 140 190 Z" fill="{D}" {S}/>
    <circle cx="178" cy="196" r="7" fill="{K}"/><circle cx="222" cy="196" r="7" fill="{K}"/>
    <path d="M164 180 L190 184 M210 184 L236 180" stroke="{K}" stroke-width="5" stroke-linecap="round"/>
    <path class="{p}-boca" d="M184 234 Q200 226 216 234" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
  </g>
</g></svg>'''


def maniqui(p, saco=W, solapa=K, cinta=True):
    """Maniquí de sastre con un saco hecho a medida. SVG 300x560 (base en y 550). Clases: {p}-saco, {p}-cinta."""
    ci = f'<path class="{p}-cinta" d="M96 120 Q150 150 204 120 L214 330" stroke="{D}" stroke-width="12" fill="none" stroke-linecap="round"/>' if cinta else ""
    return f'''<svg viewBox="0 0 300 560" aria-hidden="true">
  <path d="M150 380 V520 M100 540 L150 520 L200 540" stroke="{D}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <rect x="134" y="36" width="32" height="40" rx="8" fill="{G}" {S}/>
  <path d="M90 90 Q150 66 210 90 Q236 200 214 260 Q206 330 222 390 L78 390 Q94 330 86 260 Q64 200 90 90 Z" fill="{G}" {S}/>
  <g class="{p}-saco"><path d="M84 94 Q150 72 216 94 Q240 200 220 270 L226 400 L74 400 L80 270 Q60 200 84 94 Z" fill="{saco}" {S}/>
    <path d="M120 84 L150 210 L180 84" fill="none" stroke="{solapa}" stroke-width="10" stroke-linejoin="round"/>
    <path d="M150 210 L150 400" stroke="{K}" stroke-width="5"/>
    <circle cx="164" cy="250" r="7" fill="{K}"/><circle cx="164" cy="310" r="7" fill="{K}"/>
    <path d="M100 300 H134 M172 170 H200" stroke="{K}" stroke-width="5" stroke-linecap="round"/></g>
  {ci}
</svg>'''


def tag(cls, texto, sub="", color=D, w=None, h=150, rot=-8):
    """Etiqueta de talle colgando (div). Texto Cormorant + sub mono."""
    s = f'<small>{sub}</small>' if sub else ""
    ancho = f"width:{w}px;" if w else ""
    return f'<div class="tag {cls}" data-layout-allow-overlap style="{ancho}height:{h}px;background:{color};transform:rotate({rot}deg)"><i class="tag-ag"></i><b>{texto}</b>{s}</div>'


def flash(cls, x, y, r, color=W):
    k = r * 0.16
    return f'<path class="{cls}" d="M{x} {y-r} L{x+k} {y-k} L{x+r} {y} L{x+k} {y+k} L{x} {y+r} L{x-k} {y+k} L{x-r} {y} L{x-k} {y-k} Z" fill="{color}"/>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    @font-face { font-family: "Cormorant"; font-weight: 600; font-display: block; src: url("assets/fonts/CormorantGaramond-600.woff2") format("woff2"); }
    @font-face { font-family: "Cormorant"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 400px; height: 720px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .rev { position: absolute; left: 0; right: 0; text-align: center; font-family: "Cormorant", serif; font-weight: 600; text-transform: uppercase; line-height: 0.9; white-space: nowrap; letter-spacing: 0.01em; color: #f6f1ea; text-shadow: 0 6px 0 #0e0c10, 0 0 30px rgba(14, 12, 16, 0.9); }
    [data-composition-id="%ID%"] .rev.it { font-style: italic; font-weight: 500; text-transform: none; }
    [data-composition-id="%ID%"] .rev.f { color: #ff2e88; }
    [data-composition-id="%ID%"] .rev.d { color: #d8b25c; }
    [data-composition-id="%ID%"] .rev.v { color: #5ce611; }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; white-space: nowrap; }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 16px 40px 8px; border: 10px solid currentColor; border-radius: 8px; font-family: "Cormorant", serif; font-weight: 600; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #0e0c10; }
    [data-composition-id="%ID%"] .tag { position: absolute; border: 6px solid #0e0c10; border-radius: 10px 40px 40px 10px; text-align: center; box-shadow: 8px 8px 0 #0e0c10; }
    [data-composition-id="%ID%"] .tag .tag-ag { position: absolute; right: 22px; top: 50%; width: 22px; height: 22px; margin-top: -11px; border-radius: 50%; background: #0e0c10; }
    [data-composition-id="%ID%"] .tag b { display: block; margin: 20px 66px 0 22px; font-family: "Cormorant", serif; font-weight: 600; font-size: 56px; line-height: 0.95; color: #0e0c10; text-transform: uppercase; white-space: nowrap; }
    [data-composition-id="%ID%"] .tag small { display: block; margin: 6px 66px 0 22px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.12em; color: #0e0c10; text-transform: uppercase; white-space: nowrap; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 20px 30px; border-radius: 28px; border: 6px solid #0e0c10; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 42px; line-height: 1.12; white-space: nowrap; color: #0e0c10; background: #f6f1ea; box-shadow: 8px 8px 0 #ff2e88; }
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
      // desfila: camina por la pasarela (balanceo + paso)
      const desfila = (el, t, d, per = 0.32) => { tl.to(el, { rotation: 3, duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)) | 1, ease: "sine.inOut", transformOrigin: "50% 100%" }, t); tl.to(el, { y: -10, duration: per / 2, yoyo: true, repeat: Math.max(1, Math.floor(d / (per / 2))) | 1, ease: "sine.inOut" }, t); };
      // dibujar un trazo (stroke-dashoffset)
      const dibujar = (el, t, d = 0.6) => { const L = el.getTotalLength(); gsap.set(el, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(el, { opacity: 1 }, t); tl.to(el, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t); };
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
