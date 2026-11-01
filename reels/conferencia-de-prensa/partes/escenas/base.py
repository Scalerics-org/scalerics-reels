# Helpers para generar las escenas de reels/conferencia-de-prensa (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
# Correr: for f in partes/escenas/s*.py; do python3 $f; done   (desde reels/conferencia-de-prensa)
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
# Paleta: tinta azul noche, azul panel, celeste, hueso, amarillo flash, rojo tarjeta (+ naranja del veterano en subtítulos, verde Scalerics solo al final)
K, N, C, B, Y, R, G = "#0d1424", "#1b3a6b", "#6cc4ff", "#f4f1e8", "#ffd447", "#e63946", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'


def _brazo(cls, x0, y0, x1, y1, x2, y2, color, mano=B, extra=""):
    return f'''<g class="{cls}">
    <path d="M{x0} {y0} L{x1} {y1} L{x2} {y2}" stroke="{K}" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M{x0} {y0} L{x1} {y1} L{x2} {y2}" stroke="{color}" stroke-width="37" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    {extra}<circle cx="{x2}" cy="{y2}" r="22" fill="{mano}" {S}/>
  </g>'''


def profe(p):
    """El Profe Néstor (el dueño, de DT). Busto. SVG 460x640 (la mesa lo tapa de y~560 para abajo).
    Clases: {p}-cuerpo, {p}-bi (svgOrigin 140 330), {p}-bd (svgOrigin 320 330), {p}-boca (escalar, origin 230 262),
    {p}-cejas, {p}-ojos, {p}-cachetes, {p}-gotas (opacity 0), {p}-cabeza, {p}-silbato."""
    return f'''<svg viewBox="0 0 460 640" aria-hidden="true"><g class="{p}-cuerpo">
  {_brazo(p + "-bi", 140, 330, 100, 470, 170, 548, N)}
  <path d="M120 318 Q230 290 340 318 Q372 460 360 640 L100 640 Q88 460 120 318 Z" fill="{N}" {S}/>
  <path d="M128 330 Q118 470 116 640 M332 330 Q342 470 344 640" stroke="{C}" stroke-width="12" fill="none"/>
  <path d="M230 318 V640" stroke="{K}" stroke-width="5"/>
  <path d="M188 300 L230 344 L272 300 L262 290 L230 322 L198 290 Z" fill="{N}" {S}/>
  <g class="{p}-silbato"><path d="M206 300 Q214 380 226 420 M254 300 Q246 380 236 420" stroke="{K}" stroke-width="4" fill="none"/>
    <path d="M214 418 H262 Q272 418 272 432 Q272 446 258 446 H226 Q210 446 210 432 Z" fill="{Y}" stroke="{K}" stroke-width="5"/><circle cx="244" cy="432" r="6" fill="{K}"/></g>
  <rect x="210" y="262" width="40" height="40" fill="{B}" {S}/>
  {_brazo(p + "-bd", 320, 330, 360, 470, 290, 548, N)}
  <g class="{p}-cabeza">
    <circle cx="156" cy="210" r="18" fill="{B}" {S}/><circle cx="304" cy="210" r="18" fill="{B}" {S}/>
    <ellipse cx="230" cy="196" rx="76" ry="84" fill="{B}" {S}/>
    <path d="M156 196 Q150 150 168 132 M304 196 Q310 150 292 132" stroke="{K}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M196 132 Q230 124 262 132" stroke="{K}" stroke-width="4" fill="none" opacity="0.4"/>
    <g class="{p}-cachetes"><circle cx="182" cy="232" r="15" fill="{R}" opacity="0.55"/><circle cx="278" cy="232" r="15" fill="{R}" opacity="0.55"/></g>
    <g class="{p}-ojos"><circle cx="204" cy="196" r="12" fill="{B}" stroke="{K}" stroke-width="4"/><circle cx="256" cy="196" r="12" fill="{B}" stroke="{K}" stroke-width="4"/>
      <circle cx="205" cy="198" r="5" fill="{K}"/><circle cx="255" cy="198" r="5" fill="{K}"/></g>
    <path class="{p}-cejas" d="M182 172 L220 180 M240 180 L278 172" stroke="{K}" stroke-width="11" stroke-linecap="round"/>
    <path d="M230 204 Q220 222 232 226" stroke="{K}" stroke-width="4" fill="none"/>
    <ellipse class="{p}-boca" cx="230" cy="262" rx="18" ry="9" fill="{K}"/>
    <path d="M188 246 Q208 230 230 240 Q252 230 272 246 Q260 256 230 248 Q200 256 188 246 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
    <g class="{p}-gotas" opacity="0">
      <path d="M302 150 C296 166 292 178 300 182 C308 186 312 176 308 164 Z" fill="{C}" stroke="{K}" stroke-width="3"/>
      <path d="M158 150 C152 166 148 178 156 182 C164 186 168 176 164 164 Z" fill="{C}" stroke="{K}" stroke-width="3"/>
    </g>
  </g>
</g></svg>'''


def periodista(p):
    """Vale, la periodista joven. Busto SVG 460x640. Sostiene un micrófono de mano (en {p}-bd).
    Clases: {p}-cuerpo, {p}-bi (svgOrigin 140 330), {p}-bd (svgOrigin 320 330), {p}-boca (origin 230 256), {p}-cejas, {p}-cabeza."""
    mic = f'<g><rect x="322" y="300" width="22" height="90" rx="6" fill="{K}"/><circle cx="333" cy="290" r="26" fill="{K}"/><rect x="314" y="330" width="40" height="34" rx="4" fill="{Y}" stroke="{K}" stroke-width="4"/><text x="334" y="354" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="18" fill="{K}">TV</text></g>'
    return f'''<svg viewBox="0 0 460 640" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M150 170 Q120 330 150 400 L310 400 Q340 330 310 170 Z" fill="{K}"/>
  {_brazo(p + "-bi", 140, 330, 104, 470, 150, 560, Y)}
  <path d="M124 318 Q230 292 336 318 Q366 460 356 640 L104 640 Q94 460 124 318 Z" fill="{Y}" {S}/>
  <path d="M196 306 L230 360 L264 306" fill="none" {S}/>
  <path d="M200 312 Q220 420 214 450 M260 312 Q240 420 246 450" stroke="{R}" stroke-width="5" fill="none"/>
  <rect x="196" y="446" width="68" height="84" rx="8" fill="{B}" {S}/><rect x="206" y="458" width="48" height="16" fill="{R}"/>
  <text x="230" y="510" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="14" fill="{K}">PRENSA</text>
  <rect x="212" y="262" width="36" height="40" fill="{B}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="230" cy="192" rx="70" ry="80" fill="{B}" {S}/>
    <path d="M160 200 Q150 110 230 104 Q312 108 302 200 Q290 150 250 140 Q220 170 170 176 Z" fill="{K}" stroke="{K}" stroke-width="4"/>
    <path d="M290 130 Q350 120 360 170 Q340 150 312 160 Z" fill="{K}"/><circle cx="300" cy="140" r="12" fill="{R}" {S}/>
    <g class="{p}-ojos"><ellipse cx="204" cy="200" rx="8" ry="10" fill="{K}"/><ellipse cx="256" cy="200" rx="8" ry="10" fill="{K}"/>
      <path d="M192 192 L186 186 M268 192 L274 186" stroke="{K}" stroke-width="4" stroke-linecap="round"/></g>
    <path class="{p}-cejas" d="M188 176 Q204 168 218 176 M242 172 Q256 164 272 170" stroke="{K}" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M230 208 Q222 224 234 226" stroke="{K}" stroke-width="4" fill="none"/>
    <circle cx="184" cy="232" r="11" fill="{R}" opacity="0.45"/><circle cx="276" cy="232" r="11" fill="{R}" opacity="0.45"/>
    <ellipse class="{p}-boca" cx="230" cy="250" rx="16" ry="8" fill="{R}" stroke="{K}" stroke-width="4"/>
  </g>
  {_brazo(p + "-bd", 320, 330, 380, 440, 334, 396, Y, extra=mic)}
</g></svg>'''


def radio(p):
    """El Pocho, el periodista de radio. Busto SVG 460x640, auriculares y micrófono con cubo RADIO (en {p}-bd).
    Clases: {p}-cuerpo, {p}-bi (svgOrigin 140 330), {p}-bd (svgOrigin 320 330), {p}-boca (origin 230 258), {p}-cejas, {p}-cabeza."""
    mic = f'<g><rect x="322" y="300" width="22" height="90" rx="6" fill="{K}"/><circle cx="333" cy="290" r="26" fill="{K}"/><rect x="302" y="322" width="64" height="44" rx="4" fill="{C}" stroke="{K}" stroke-width="4"/><text x="334" y="351" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="17" fill="{K}">RADIO</text></g>'
    return f'''<svg viewBox="0 0 460 640" aria-hidden="true"><g class="{p}-cuerpo">
  {_brazo(p + "-bi", 140, 330, 104, 470, 150, 560, R)}
  <path d="M120 318 Q230 292 340 318 Q370 460 360 640 L100 640 Q90 460 120 318 Z" fill="{R}" {S}/>
  <path d="M190 304 L230 350 L270 304" fill="{B}" {S}/>
  <path d="M150 420 H200 M260 420 H310" stroke="{K}" stroke-width="5" opacity="0.5"/>
  <rect x="210" y="262" width="40" height="40" fill="{B}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="230" cy="194" rx="74" ry="80" fill="{B}" {S}/>
    <path d="M158 180 Q160 110 230 108 Q300 110 302 180 Q290 140 230 140 Q180 140 158 180 Z" fill="{K}" stroke="{K}" stroke-width="4"/>
    <path d="M150 190 Q140 70 230 64 Q320 70 310 190" stroke="{K}" stroke-width="14" fill="none" stroke-linecap="round"/>
    <rect x="136" y="170" width="34" height="62" rx="14" fill="{C}" {S}/><rect x="290" y="170" width="34" height="62" rx="14" fill="{C}" {S}/>
    <g class="{p}-ojos"><path d="M194 198 Q206 190 218 198 M242 198 Q254 190 266 198" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <path class="{p}-cejas" d="M190 174 L220 180 M240 176 L270 168" stroke="{K}" stroke-width="8" stroke-linecap="round"/>
    <path d="M230 206 Q222 222 234 224" stroke="{K}" stroke-width="4" fill="none"/>
    <path d="M196 238 Q230 230 264 238" stroke="{K}" stroke-width="5" fill="none" stroke-dasharray="2 10" stroke-linecap="round"/>
    <path class="{p}-boca" d="M206 252 Q232 272 256 248 Q232 258 206 252 Z" fill="{K}" stroke="{K}" stroke-width="5" stroke-linejoin="round"/>
  </g>
  {_brazo(p + "-bd", 320, 330, 380, 440, 334, 396, R, extra=mic)}
</g></svg>'''


def veterano(p):
    """Don Aníbal, el periodista veterano. Busto SVG 460x640: boina, pelo y bigote blancos, lentes, saco azul,
    libreta en la mano izquierda. Clases: {p}-cuerpo, {p}-bi (svgOrigin 140 330), {p}-bd (svgOrigin 320 330),
    {p}-boca (origin 230 262), {p}-cejas, {p}-cabeza, {p}-dedo (índice levantado, opacity 0)."""
    libreta = f'<g><rect x="120" y="470" width="80" height="100" rx="6" fill="{B}" {S}/><path d="M132 496 H186 M132 516 H186 M132 536 H170" stroke="{N}" stroke-width="4"/></g>'
    dedo = f'<path class="{p}-dedo" d="M352 360 V306" stroke="{K}" stroke-width="22" stroke-linecap="round" opacity="0"/>'
    return f'''<svg viewBox="0 0 460 640" aria-hidden="true"><g class="{p}-cuerpo">
  {_brazo(p + "-bi", 140, 330, 96, 470, 160, 520, N, extra=libreta)}
  <path d="M118 318 Q230 292 342 318 Q372 460 362 640 L98 640 Q88 460 118 318 Z" fill="{N}" {S}/>
  <path d="M196 304 L230 420 L264 304 Z" fill="{B}" {S}/>
  <path d="M220 330 L230 316 L240 330 L236 420 L224 420 Z" fill="{R}" stroke="{K}" stroke-width="4"/>
  <path d="M196 304 L180 440 L150 330 M264 304 L280 440 L310 330" fill="none" {S}/>
  <rect x="210" y="262" width="40" height="40" fill="{B}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="156" cy="208" r="18" fill="{B}" {S}/><circle cx="304" cy="208" r="18" fill="{B}" {S}/>
    <ellipse cx="230" cy="196" rx="74" ry="82" fill="{B}" {S}/>
    <path d="M158 200 Q150 160 166 146 M302 200 Q310 160 294 146" stroke="{B}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M158 200 Q150 160 166 146 M302 200 Q310 160 294 146" stroke="{K}" stroke-width="4" fill="none" stroke-dasharray="6 8"/>
    <path d="M140 150 Q150 92 230 92 Q320 92 326 150 Q340 156 320 162 L140 162 Q124 156 140 150 Z" fill="{N}" {S}/>
    <circle cx="232" cy="88" r="9" fill="{N}" {S}/>
    <g class="{p}-ojos"><circle cx="204" cy="200" r="20" fill="none" stroke="{K}" stroke-width="6"/><circle cx="258" cy="200" r="20" fill="none" stroke="{K}" stroke-width="6"/>
      <path d="M224 200 H238" stroke="{K}" stroke-width="5"/><path d="M196 202 Q204 196 212 202 M250 202 Q258 196 266 202" stroke="{K}" stroke-width="5" fill="none" stroke-linecap="round"/></g>
    <path class="{p}-cejas" d="M186 172 Q204 164 220 172 M240 172 Q258 164 276 172" stroke="{B}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path class="{p}-cejas2" d="M186 172 Q204 164 220 172 M240 172 Q258 164 276 172" stroke="{K}" stroke-width="3" fill="none"/>
    <path d="M230 210 Q220 228 234 230" stroke="{K}" stroke-width="4" fill="none"/>
    <ellipse class="{p}-boca" cx="230" cy="262" rx="14" ry="7" fill="{K}"/>
    <path d="M180 252 Q204 234 230 244 Q256 234 280 252 Q262 264 230 252 Q198 264 180 252 Z" fill="{B}" {S}/>
  </g>
  {_brazo(p + "-bd", 320, 330, 380, 450, 352, 380, N, extra=dedo)}
</g></svg>'''


def jugador(p, luz=False):
    """El jugador misterioso: un celular con piernas y brazos, con la camiseta número 12. SVG 360x620.
    luz=False: silueta (todo tinta) con un signo de pregunta. Clases: {p}-cuerpo, {p}-cara (pantalla),
    {p}-bi (svgOrigin 70 250), {p}-bd (svgOrigin 290 250), {p}-pi (svgOrigin 140 470), {p}-pd (svgOrigin 220 470)."""
    f1 = N if luz else K
    pant = C if luz else "#16223a"
    cara = (f'<g class="{p}-cara"><circle cx="150" cy="130" r="14" fill="{K}"/><circle cx="210" cy="130" r="14" fill="{K}"/>'
            f'<path d="M140 170 Q180 200 220 170" stroke="{K}" stroke-width="8" fill="none" stroke-linecap="round"/></g>') if luz else \
        f'<text class="{p}-cara" x="180" y="190" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="130" fill="{Y}">?</text>'
    ol = B if not luz else K
    return f'''<svg viewBox="0 0 360 620" aria-hidden="true"><g class="{p}-cuerpo">
  <path class="{p}-pi" d="M140 470 L120 590" stroke="{ol}" stroke-width="44" stroke-linecap="round"/>
  <path class="{p}-pd" d="M220 470 L240 590" stroke="{ol}" stroke-width="44" stroke-linecap="round"/>
  <path d="M140 470 L120 590 M220 470 L240 590" stroke="{f1}" stroke-width="30" stroke-linecap="round"/>
  <path d="M120 590 m-30 0 h46 M240 590 m-16 0 h46" stroke="{ol}" stroke-width="24" stroke-linecap="round"/>
  <path class="{p}-bi" d="M70 250 L30 360" stroke="{f1}" stroke-width="34" stroke-linecap="round"/>
  <path class="{p}-bd" d="M290 250 L330 360" stroke="{f1}" stroke-width="34" stroke-linecap="round"/>
  <rect x="60" y="20" width="240" height="470" rx="44" fill="{f1}" stroke="{ol}" stroke-width="7"/>
  <rect x="82" y="50" width="196" height="200" rx="26" fill="{pant}" stroke="{ol}" stroke-width="5"/>
  <rect x="150" y="30" width="60" height="10" rx="5" fill="{ol}"/>
  {cara}
  <path d="M60 270 H300 V420 Q180 440 60 420 Z" fill="{C if luz else K}" stroke="{ol}" stroke-width="6"/>
  <text x="180" y="390" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="110" fill="{K if luz else '#16223a'}">12</text>
</g></svg>'''


def libreta_dt(p):
    """Cuaderno de tapa dura. SVG 360x260. La hoja que se da vuelta: {p}-hoja (svgOrigin 180 130)."""
    return f'''<svg viewBox="0 0 360 260" aria-hidden="true">
  <rect x="10" y="10" width="340" height="240" rx="10" fill="{N}" {S}/>
  <rect x="30" y="24" width="150" height="212" fill="{B}" stroke="{K}" stroke-width="4"/>
  <path d="M46 70 H160 M46 100 H160 M46 130 H140 M46 160 H160" stroke="{N}" stroke-width="4"/>
  <text x="105" y="58" text-anchor="middle" font-family="Lexend" font-weight="800" font-size="22" fill="{R}">CLÁSICO</text>
  <rect x="180" y="24" width="150" height="212" fill="{B}" stroke="{K}" stroke-width="4"/>
  <g class="{p}-hoja"><rect x="180" y="24" width="150" height="212" fill="{B}" stroke="{K}" stroke-width="4"/>
    <text x="255" y="140" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="64" fill="{R}">0-1</text></g>
  <path d="M180 24 V236" stroke="{K}" stroke-width="5"/>
</svg>'''


def destello(cls, x, y, r, color=Y):
    k = r * 0.22
    return f'<path class="{cls}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}" stroke="{K}" stroke-width="4"/>'


def tarjeta(cls, x, y, color=R, rot=-10, w=120, h=170):
    return f'<rect class="{cls}" x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{color}" stroke="{K}" stroke-width="6" transform="rotate({rot} {x + w/2} {y + h/2})"/>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 460px; height: 640px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap;
      letter-spacing: -0.02em; -webkit-text-stroke: 12px #0d1424; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .big.b { color: #f4f1e8; text-shadow: 9px 9px 0 #e63946; }
    [data-composition-id="%ID%"] .big.y { color: #ffd447; text-shadow: 9px 9px 0 #0d1424; }
    [data-composition-id="%ID%"] .big.c { color: #6cc4ff; text-shadow: 9px 9px 0 #0d1424; }
    [data-composition-id="%ID%"] .big.r { color: #e63946; text-shadow: 9px 9px 0 #f4f1e8; }
    [data-composition-id="%ID%"] .big.g { color: #5ce611; text-shadow: 8px 8px 0 #0d1424; }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 18px 46px 10px; border: 12px solid currentColor; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #0d1424; }
    [data-composition-id="%ID%"] .centro { left: 0; right: 0; margin-left: auto; margin-right: auto; width: max-content; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 22px 32px; border-radius: 30px; border: 6px solid #0d1424; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.12; white-space: nowrap; color: #0d1424; background: #f4f1e8; box-shadow: 8px 8px 0 #0d1424; }
    [data-composition-id="%ID%"] .cel { position: absolute; border-radius: 52px; border: 8px solid #0d1424; background: #0d1424; box-shadow: 0 0 0 6px #6cc4ff, 12px 12px 0 6px #0d1424; }
    [data-composition-id="%ID%"] .cel .barra { position: absolute; left: 50%; top: 14px; width: 110px; height: 22px; margin-left: -55px; border-radius: 12px; background: #0d1424; z-index: 2; }
    [data-composition-id="%ID%"] .cel .pant { position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: 44px; background: #f4f1e8; overflow: hidden; }
    [data-composition-id="%ID%"] .cel .head { position: absolute; left: 0; right: 0; top: 0; height: 130px; background: #1b3a6b; border-bottom: 5px solid #0d1424; }
    [data-composition-id="%ID%"] .cel .head b { position: absolute; left: 110px; top: 46px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; color: #f4f1e8; white-space: nowrap; }
    [data-composition-id="%ID%"] .cel .head small { position: absolute; left: 110px; top: 86px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; color: #6cc4ff; white-space: nowrap; }
    [data-composition-id="%ID%"] .cel .head i { position: absolute; left: 30px; top: 46px; width: 64px; height: 64px; border-radius: 50%; background: #6cc4ff; border: 4px solid #0d1424; }
    [data-composition-id="%ID%"] .msg { position: absolute; max-width: 82%; padding: 14px 20px 12px; border-radius: 22px; border: 4px solid #0d1424; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 30px; line-height: 1.18; color: #0d1424; white-space: nowrap; }
    [data-composition-id="%ID%"] .msg.yo { right: 18px; background: #6cc4ff; border-bottom-right-radius: 6px; }
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
      // brazo: rota un brazo del personaje (prefijo pp) alrededor del hombro
      const brazo = (pp, lado, rot, t, d = 0.25) => tl.to(q("." + pp + "-b" + lado), { rotation: rot, svgOrigin: lado === "i" ? "140 330" : "320 330", duration: d, ease: "back.out(2)" }, t);
      const brazoSet = (pp, lado, rot) => gsap.set(q("." + pp + "-b" + lado), { rotation: rot, svgOrigin: lado === "i" ? "140 330" : "320 330" });
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


def mic_mano(p, color=Y, lab="TV"):
    """Brazo que entra desde la izquierda con un micrófono de mano. SVG 420x160, la punta del micrófono en x~400."""
    return f'''<svg viewBox="0 0 420 160" aria-hidden="true">
  <path d="M-80 120 L210 96" stroke="{K}" stroke-width="56" stroke-linecap="round"/>
  <path d="M-80 120 L210 96" stroke="{color}" stroke-width="42" stroke-linecap="round"/>
  <rect x="214" y="72" width="140" height="30" rx="10" fill="{K}"/>
  <rect x="250" y="56" width="62" height="58" rx="6" fill="{color}" stroke="{K}" stroke-width="5"/>
  <text x="281" y="94" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="22" fill="{K}">{lab}</text>
  <ellipse cx="370" cy="86" rx="34" ry="30" fill="{K}"/>
  <path d="M352 70 L388 102 M352 102 L388 70" stroke="#2a3a5a" stroke-width="4"/>
  <circle cx="226" cy="100" r="26" fill="{B}" {S}/>
</svg>'''


def durmiendo(p):
    """El de enfrente durmiendo: cabeza en la almohada con gorro de dormir. SVG 440x240. Clases: {p}-z (las Z), {p}-cabeza."""
    return f'''<svg viewBox="0 0 440 240" aria-hidden="true">
  <rect x="20" y="130" width="400" height="100" rx="40" fill="{B}" {S}/>
  <path d="M60 150 Q220 120 380 150" stroke="{C}" stroke-width="5" fill="none" opacity="0.6"/>
  <g class="{p}-cabeza"><ellipse cx="180" cy="130" rx="70" ry="64" fill="{B}" {S}/>
    <path d="M118 104 Q150 30 240 60 Q290 40 320 90 L300 104 Q250 76 210 92 Q170 70 118 104 Z" fill="{R}" {S}/><circle cx="324" cy="94" r="16" fill="{B}" {S}/>
    <path d="M148 132 Q160 142 172 132 M196 132 Q208 142 220 132" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M168 168 Q184 176 200 168" stroke="{K}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="138" cy="156" r="10" fill="{R}" opacity="0.4"/><circle cx="228" cy="156" r="10" fill="{R}" opacity="0.4"/></g>
  <text class="{p}-z" x="290" y="60" font-family="Lexend" font-weight="900" font-size="54" fill="{Y}" stroke="{K}" stroke-width="3">Z</text>
  <text class="{p}-z" x="340" y="30" font-family="Lexend" font-weight="900" font-size="40" fill="{Y}" stroke="{K}" stroke-width="3">z</text>
  <text class="{p}-z" x="380" y="8" font-family="Lexend" font-weight="900" font-size="30" fill="{Y}" stroke="{K}" stroke-width="3">z</text>
</svg>'''
