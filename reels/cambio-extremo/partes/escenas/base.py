# Helpers para generar las escenas de reels/cambio-extremo (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
K, W, T, N, Y, G = "#16191d", "#fbfaf5", "#14c4b8", "#ff7a1a", "#ffd21f", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'


def conductora(p):
    """SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292), {p}-bd (svgOrigin 250 292,
    tiene el micrófono), {p}-boca (escalar Y para hablar, origin 200 238), {p}-ojos, {p}-cabeza."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M172 470 L166 690 M228 470 L234 690" stroke="{K}" stroke-width="46" stroke-linecap="round" fill="none"/>
  <path d="M172 470 L166 690 M228 470 L234 690" stroke="{W}" stroke-width="32" stroke-linecap="round" fill="none"/>
  <path d="M166 640 L166 690 M234 640 L234 690" stroke="{T}" stroke-width="32" fill="none"/>
  <ellipse cx="156" cy="700" rx="34" ry="15" fill="{K}"/><ellipse cx="244" cy="700" rx="34" ry="15" fill="{K}"/>
  <path d="M138 440 L262 440 L280 600 L120 600 Z" fill="{K}" {S}/>
  <g class="{p}-bi">
    <path d="M150 292 L118 390 L120 470" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M150 292 L118 390 L120 470" stroke="{T}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="120" cy="480" r="18" fill="{W}" {S}/>
  </g>
  <g class="{p}-bd">
    <path d="M250 292 L282 390 L280 470" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M250 292 L282 390 L280 470" stroke="{T}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <g class="{p}-mic"><rect x="270" y="428" width="22" height="64" rx="6" fill="{K}" stroke="{W}" stroke-width="4"/>
      <circle cx="281" cy="420" r="20" fill="{K}" stroke="{W}" stroke-width="5"/><path d="M268 414 H294 M268 424 H294" stroke="{W}" stroke-width="3" opacity="0.6"/></g>
    <circle cx="280" cy="478" r="18" fill="{W}" {S}/>
  </g>
  <path d="M140 278 Q200 262 260 278 L270 456 Q200 470 130 456 Z" fill="{T}" {S}/>
  <path d="M176 276 L200 360 L224 276 Z" fill="{W}" {S}/>
  <path d="M176 276 L190 330 L160 300 Z M224 276 L210 330 L240 300 Z" fill="{T}" {S}/>
  <circle cx="232" cy="390" r="6" fill="{K}"/><circle cx="232" cy="420" r="6" fill="{K}"/>
  <rect x="186" y="236" width="28" height="30" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <path d="M128 200 Q124 120 200 112 Q276 120 272 200 L276 262 Q240 270 236 230 L164 230 Q160 270 124 262 Z" fill="{K}" {S}/>
    <ellipse cx="200" cy="190" rx="60" ry="66" fill="{W}" {S}/>
    <path d="M140 160 Q170 130 214 140 Q240 146 262 168 Q250 128 200 124 Q150 126 140 160 Z" fill="{K}"/>
    <g class="{p}-ojos"><ellipse cx="178" cy="190" rx="7" ry="9" fill="{K}"/><ellipse cx="222" cy="190" rx="7" ry="9" fill="{K}"/>
      <path d="M164 172 L190 168 M210 168 L236 172" stroke="{K}" stroke-width="5" stroke-linecap="round"/></g>
    <circle cx="160" cy="214" r="10" fill="{N}" opacity="0.35"/><circle cx="240" cy="214" r="10" fill="{N}" opacity="0.35"/>
    <path class="{p}-boca" d="M178 226 Q200 254 222 226 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M186 229 H214" stroke="{W}" stroke-width="5"/>
    <path d="M118 150 Q120 84 200 80 Q280 84 282 150 Z" fill="{W}" {S}/>
    <path d="M100 152 Q200 136 300 152 L300 166 Q200 152 100 166 Z" fill="{W}" {S}/>
    <path d="M200 82 V148" stroke="{T}" stroke-width="14"/>
  </g>
</g></svg>'''


def monica(p):
    """SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 152 300), {p}-bd (svgOrigin 248 300),
    {p}-boca (sonrisa), {p}-boca-llora (boca abierta temblando, opacity 0), {p}-lagrimas (opacity 0), {p}-ojos,
    {p}-ojos-llora (opacity 0), {p}-cabeza."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M176 520 L172 690 M224 520 L228 690" stroke="{K}" stroke-width="40" stroke-linecap="round" fill="none"/>
  <path d="M176 520 L172 690 M224 520 L228 690" stroke="{W}" stroke-width="26" stroke-linecap="round" fill="none"/>
  <ellipse cx="164" cy="700" rx="32" ry="14" fill="{N}" {S}/><ellipse cx="236" cy="700" rx="32" ry="14" fill="{N}" {S}/>
  <path d="M136 450 L264 450 L286 590 L114 590 Z" fill="{T}" {S}/>
  <path d="M130 560 H270" stroke="{K}" stroke-width="4" opacity="0.4"/>
  <g class="{p}-bi">
    <path d="M152 300 L120 396 L130 470" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M152 300 L120 396 L130 470" stroke="{N}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="130" cy="480" r="18" fill="{W}" {S}/>
  </g>
  <g class="{p}-bd">
    <path d="M248 300 L280 396 L270 470" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M248 300 L280 396 L270 470" stroke="{N}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="270" cy="480" r="18" fill="{W}" {S}/>
  </g>
  <path d="M142 286 Q200 268 258 286 L268 470 Q200 484 132 470 Z" fill="{N}" {S}/>
  <path d="M178 284 Q200 330 222 284" fill="{W}" {S}/>
  <path d="M200 320 V470" stroke="{K}" stroke-width="5"/>
  <circle cx="214" cy="356" r="6" fill="{K}"/><circle cx="214" cy="400" r="6" fill="{K}"/><circle cx="214" cy="444" r="6" fill="{K}"/>
  <path d="M150 284 Q200 312 250 284" stroke="{Y}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <rect x="186" y="244" width="28" height="30" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="200" cy="96" r="34" fill="{W}" {S}/>
    <circle cx="146" cy="150" r="34" fill="{W}" {S}/><circle cx="254" cy="150" r="34" fill="{W}" {S}/>
    <circle cx="170" cy="120" r="34" fill="{W}" {S}/><circle cx="230" cy="120" r="34" fill="{W}" {S}/>
    <circle cx="200" cy="114" r="34" fill="{W}" {S}/>
    <ellipse cx="200" cy="196" rx="62" ry="66" fill="{W}" {S}/>
    <path d="M144 170 Q160 136 200 140 Q240 136 256 170 Q232 150 200 156 Q168 150 144 170 Z" fill="{W}" {S}/>
    <circle cx="140" cy="204" r="16" fill="{W}" {S}/><circle cx="260" cy="204" r="16" fill="{W}" {S}/>
    <g class="{p}-ojos"><circle cx="178" cy="194" r="6" fill="{K}"/><circle cx="222" cy="194" r="6" fill="{K}"/></g>
    <g class="{p}-ojos-llora" opacity="0"><path d="M166 196 Q178 186 190 196 M210 196 Q222 186 234 196" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <circle cx="178" cy="194" r="20" fill="none" stroke="{K}" stroke-width="5"/><circle cx="222" cy="194" r="20" fill="none" stroke="{K}" stroke-width="5"/>
    <path d="M198 192 H202" stroke="{K}" stroke-width="5"/>
    <path d="M160 166 L190 162 M210 162 L240 166" stroke="{K}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>
    <circle cx="160" cy="226" r="11" fill="{N}" opacity="0.4"/><circle cx="240" cy="226" r="11" fill="{N}" opacity="0.4"/>
    <path class="{p}-boca" d="M180 232 Q200 254 220 232" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path class="{p}-boca-llora" d="M178 246 Q188 230 200 236 Q212 230 222 246 Q200 262 178 246 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round" opacity="0"/>
    <g class="{p}-lagrimas" opacity="0">
      <path class="{p}-lag1" d="M166 214 C160 232 156 246 164 252 C172 256 178 246 174 232 Z" fill="{T}" stroke="{K}" stroke-width="3"/>
      <path class="{p}-lag2" d="M234 214 C228 232 224 246 232 252 C240 256 246 246 242 232 Z" fill="{T}" stroke="{K}" stroke-width="3"/>
      <path d="M160 214 Q140 260 150 300 M240 214 Q262 260 252 300" stroke="{T}" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.85"/>
    </g>
  </g>
</g></svg>'''


def capataz(p, planilla=True):
    """SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 148 296, tiene la planilla),
    {p}-bd (svgOrigin 252 296), {p}-boca (escalar Y, origin 200 240), {p}-ojos, {p}-ceja, {p}-cabeza, {p}-planilla."""
    pl = f'''<g class="{p}-planilla"><rect x="62" y="404" width="96" height="124" rx="8" fill="{N}" {S}/>
      <rect x="72" y="420" width="76" height="98" fill="{W}" stroke="{K}" stroke-width="3"/>
      <rect x="94" y="396" width="32" height="16" rx="4" fill="{K}"/>
      <path d="M82 440 H138 M82 460 H138 M82 480 H124 M82 500 H132" stroke="{K}" stroke-width="4"/></g>''' if planilla else ""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M176 480 L170 680 M224 480 L230 680" stroke="{K}" stroke-width="52" stroke-linecap="round" fill="none"/>
  <path d="M176 480 L170 680 M224 480 L230 680" stroke="#2c4a66" stroke-width="38" stroke-linecap="round" fill="none"/>
  <path d="M130 676 Q130 650 170 650 Q196 650 196 690 L130 700 Z M270 676 Q270 650 230 650 Q204 650 204 690 L270 700 Z" fill="{N}" {S}/>
  <g class="{p}-bi">
    <path d="M148 296 L110 392 L112 470" stroke="{K}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M148 296 L110 392 L112 470" stroke="{W}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    {pl}
    <circle cx="114" cy="474" r="20" fill="{W}" {S}/>
  </g>
  <g class="{p}-bd">
    <path d="M252 296 L290 392 L288 470" stroke="{K}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M252 296 L290 392 L288 470" stroke="{W}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="288" cy="476" r="20" fill="{W}" {S}/>
  </g>
  <path d="M138 282 Q200 266 262 282 Q282 390 270 494 Q200 508 130 494 Q118 390 138 282 Z" fill="{W}" {S}/>
  <path d="M138 282 L180 282 L176 494 L130 494 Q118 390 138 282 Z M262 282 L220 282 L224 494 L270 494 Q282 390 262 282 Z" fill="{N}" {S}/>
  <path d="M128 400 H178 M222 400 H272 M126 440 H176 M224 440 H274" stroke="{Y}" stroke-width="14"/>
  <rect x="184" y="244" width="32" height="32" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="200" cy="196" rx="66" ry="68" fill="{W}" {S}/>
    <circle cx="134" cy="204" r="15" fill="{W}" {S}/><circle cx="266" cy="204" r="15" fill="{W}" {S}/>
    <g class="{p}-ojos"><circle cx="176" cy="192" r="7" fill="{K}"/><circle cx="224" cy="192" r="7" fill="{K}"/></g>
    <path class="{p}-ceja" d="M156 172 L194 178 M206 178 L244 172" stroke="{K}" stroke-width="10" stroke-linecap="round"/>
    <path d="M200 196 Q192 214 200 218" stroke="{K}" stroke-width="4" fill="none"/>
    <path d="M160 232 Q180 214 200 226 Q220 214 240 232 Q220 236 200 232 Q180 236 160 232 Z" fill="{K}" {S}/>
    <ellipse class="{p}-boca" cx="200" cy="246" rx="14" ry="6" fill="{K}"/>
    <path d="M128 160 Q126 92 200 88 Q274 92 272 160 Z" fill="{Y}" {S}/>
    <path d="M104 162 Q200 142 296 162 L300 178 Q200 160 100 178 Z" fill="{Y}" {S}/>
    <path d="M200 90 V156 M168 96 Q160 120 162 156 M232 96 Q240 120 238 156" stroke="{K}" stroke-width="5" fill="none"/>
  </g>
</g></svg>'''


def camion(p):
    """SVG 1000x560 vista de costado, ruedas en y~500. Clases: {p}-rueda (girar con transformOrigin), {p}-humo."""
    return f'''<svg viewBox="0 0 1000 560" aria-hidden="true"><g class="{p}-cuerpo">
  <rect x="30" y="40" width="660" height="400" rx="16" fill="{N}" {S}/>
  <rect x="60" y="70" width="600" height="340" rx="10" fill="none" stroke="{K}" stroke-width="5" opacity="0.5"/>
  <text x="360" y="200" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="88" fill="{W}" stroke="{K}" stroke-width="10" paint-order="stroke fill">CAMBIO</text>
  <text x="360" y="300" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="88" fill="{Y}" stroke="{K}" stroke-width="10" paint-order="stroke fill">RADICAL</text>
  <path d="M60 360 L660 360" stroke="{Y}" stroke-width="22" stroke-dasharray="40 30"/>
  <path d="M690 150 L850 150 Q900 150 930 230 L960 320 L960 440 L690 440 Z" fill="{T}" {S}/>
  <path d="M720 180 L840 180 Q870 182 892 250 L720 250 Z" fill="{W}" {S}/>
  <rect x="930" y="360" width="40" height="40" rx="6" fill="{Y}" {S}/>
  <rect x="20" y="430" width="960" height="34" rx="10" fill="{K}"/>
  <g class="{p}-rueda" data-c="200 480"><circle cx="200" cy="480" r="66" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="200" cy="480" r="24" fill="{W}"/><path d="M200 420 V540 M140 480 H260" stroke="{W}" stroke-width="6"/></g>
  <g class="{p}-rueda" data-c="480 480"><circle cx="480" cy="480" r="66" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="480" cy="480" r="24" fill="{W}"/><path d="M480 420 V540 M420 480 H540" stroke="{W}" stroke-width="6"/></g>
  <g class="{p}-rueda" data-c="820 480"><circle cx="820" cy="480" r="66" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="820" cy="480" r="24" fill="{W}"/><path d="M820 420 V540 M760 480 H880" stroke="{W}" stroke-width="6"/></g>
</g></svg>'''


def local(p, cartel="", persiana=False):
    """SVG 700x700: fachada de local con toldo naranja a rayas. Clases: {p}-persiana (si persiana=True; mover y desde -420),
    {p}-puerta, {p}-vidriera."""
    rayas = "".join(f'<path d="M{110 + i * 60} 150 L{110 + i * 60 + 30} 150 L{100 + i * 60 + 30} 240 L{100 + i * 60} 240 Z" fill="{W}"/>' for i in range(8))
    pers = f'''<g class="{p}-persiana"><rect x="96" y="250" width="508" height="400" fill="#8a9097" {S}/>
      {"".join(f'<path d="M100 {280 + i * 30} H600" stroke="{K}" stroke-width="4"/>' for i in range(12))}
      <rect x="320" y="610" width="60" height="30" rx="6" fill="{Y}" {S}/></g>''' if persiana else ""
    txt = f'<text x="350" y="118" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="52" fill="{W}">{cartel}</text>' if cartel else ""
    return f'''<svg viewBox="0 0 700 700" aria-hidden="true">
  <rect x="60" y="60" width="580" height="610" fill="#2a3036" {S}/>
  <rect x="80" y="70" width="540" height="76" rx="8" fill="{K}" stroke="{W}" stroke-width="5"/>{txt}
  <path d="M70 150 L630 150 L650 240 L50 240 Z" fill="{N}" {S}/>{rayas}
  <path d="M70 150 L630 150 L650 240 L50 240 Z" fill="none" {S}/>
  <g class="{p}-vidriera"><rect x="96" y="270" width="300" height="300" fill="{T}" opacity="0.35" {S}/>
    <rect x="96" y="270" width="300" height="300" fill="none" stroke="{W}" stroke-width="6"/>
    <path d="M130 540 L130 470 L190 470 L190 540 Z M220 540 L220 430 L270 430 L270 540 Z M300 540 Q330 470 360 540 Z" fill="{W}" opacity="0.8"/>
    <path d="M120 300 L170 300 M120 320 L150 320" stroke="{W}" stroke-width="6" stroke-linecap="round" opacity="0.7"/></g>
  <g class="{p}-puerta"><rect x="430" y="300" width="160" height="350" fill="{K}" stroke="{W}" stroke-width="6"/>
    <rect x="450" y="320" width="120" height="160" fill="{T}" opacity="0.3"/><circle cx="560" cy="500" r="9" fill="{Y}"/></g>
  <rect x="40" y="650" width="620" height="24" fill="{W}" {S}/>
  {pers}
</svg>'''


def celular(p, w=420, h=820):
    """Marco de celular (div). Devuelve html con un div .{p}-pantalla adentro para llenar."""
    return f'<div class="{p}-cel" style="width:{w}px;height:{h}px"><div class="{p}-barra"></div><div class="{p}-pantalla"></div></div>'


def cinta(cls, texto="PELIGRO · PELIGRO · PELIGRO · PELIGRO · PELIGRO · PELIGRO"):
    return f'<div class="cinta {cls}"><span>{texto}</span></div>'


def destello(cls, x, y, r, color=Y):
    k = r * 0.26
    return f'<path class="{cls}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}" stroke="{K}" stroke-width="4"/>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.%P%-full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 400px; height: 720px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap;
      letter-spacing: -0.02em; -webkit-text-stroke: 12px #16191d; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .big.w { color: #fbfaf5; text-shadow: 9px 9px 0 #ff7a1a; }
    [data-composition-id="%ID%"] .big.n { color: #ff7a1a; text-shadow: 9px 9px 0 #16191d; }
    [data-composition-id="%ID%"] .big.t { color: #14c4b8; text-shadow: 9px 9px 0 #16191d; }
    [data-composition-id="%ID%"] .big.y { color: #ffd21f; text-shadow: 9px 9px 0 #ff7a1a; }
    [data-composition-id="%ID%"] .big.wt { color: #fbfaf5; text-shadow: 9px 9px 0 #14c4b8; }
    [data-composition-id="%ID%"] .big.v { color: #5ce611; text-shadow: 8px 8px 0 #16191d; }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 18px 46px 10px; border: 14px solid currentColor; border-radius: 22px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #16191d; }
    [data-composition-id="%ID%"] .cinta { position: absolute; left: -200px; width: 1480px; height: 76px; overflow: hidden; border: 5px solid #16191d;
      background: repeating-linear-gradient(-45deg, #ffd21f 0px, #ffd21f 38px, #16191d 38px, #16191d 76px); }
    [data-composition-id="%ID%"] .cinta span { position: absolute; left: 0; right: 0; top: 11px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 40px; color: #16191d;
      letter-spacing: 0.06em; white-space: nowrap; }
    [data-composition-id="%ID%"] .cinta span { -webkit-text-stroke: 0; background: #ffd21f; display: inline-block; left: 50%; right: auto; transform: translateX(-50%); padding: 0 24px; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 22px 32px; border-radius: 30px; border: 6px solid #16191d; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.12; white-space: nowrap; color: #16191d; background: #fbfaf5; box-shadow: 8px 8px 0 #16191d; }
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


def productos_svg():
    """Cuatro dibujitos de productos (taza, vela, planta, osito) en celdas de 120x100: devuelve lista de <svg>."""
    taza = f'<svg viewBox="0 0 120 100"><path d="M30 30 H80 V78 Q80 88 70 88 H40 Q30 88 30 78 Z" fill="{W}" {S}/><path d="M80 42 Q100 42 100 58 Q100 72 80 72" fill="none" {S}/><path d="M44 52 Q55 44 66 52" stroke="{N}" stroke-width="6" fill="none"/></svg>'
    vela = f'<svg viewBox="0 0 120 100"><rect x="40" y="40" width="40" height="50" rx="6" fill="{Y}" {S}/><path d="M60 40 V30" {S}/><path d="M60 8 Q72 22 60 30 Q48 22 60 8 Z" fill="{N}" {S}/></svg>'
    planta = f'<svg viewBox="0 0 120 100"><path d="M38 60 H82 L76 92 H44 Z" fill="{N}" {S}/><path d="M60 60 Q40 30 30 34 Q36 56 60 60 Q80 30 92 34 Q86 56 60 60 Q60 20 60 14" fill="{T}" {S}/></svg>'
    oso = f'<svg viewBox="0 0 120 100"><circle cx="40" cy="26" r="12" fill="{N}" {S}/><circle cx="80" cy="26" r="12" fill="{N}" {S}/><circle cx="60" cy="50" r="30" fill="{N}" {S}/><circle cx="50" cy="46" r="4" fill="{K}"/><circle cx="70" cy="46" r="4" fill="{K}"/><ellipse cx="60" cy="60" rx="10" ry="7" fill="{W}" {S}/></svg>'
    return [taza, vela, planta, oso]


def tienda(p, precios=("$ 690", "$ 450", "$ 890", "$ 990"), boton="COMPRAR"):
    """Pantalla de la tienda online de Mónica (va adentro de .{p}-pantalla). Clases: {p}-card, {p}-precio, {p}-boton."""
    prods = productos_svg()
    cards = "".join(f'<div class="{p}-card"><div class="{p}-foto">{prods[i]}</div><div class="{p}-precio">{precios[i]}</div></div>' for i in range(4))
    return f'''<div class="{p}-head"><b>REGALOS MÓNICA</b><small>TIENDA ONLINE</small></div>
      <div class="{p}-grid">{cards}</div>
      <div class="{p}-boton">{boton}</div>'''


def css_tienda(p, w=420, h=820):
    """CSS del celular y la tienda (prefijo p). El celular mide w x h."""
    cw = (w - 28 * 2 - 18) / 2
    return f"""
    [data-composition-id="%ID%"] .{p}-cel {{ position: absolute; border-radius: 52px; border: 8px solid #16191d; background: #16191d; box-shadow: 0 0 0 6px #fbfaf5, 12px 12px 0 6px #16191d; }}
    [data-composition-id="%ID%"] .{p}-barra {{ position: absolute; left: 50%; top: 14px; width: 110px; height: 22px; margin-left: -55px; border-radius: 12px; background: #16191d; z-index: 2; }}
    [data-composition-id="%ID%"] .{p}-pantalla {{ position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: 44px; background: #fbfaf5; overflow: hidden; }}
    [data-composition-id="%ID%"] .{p}-head {{ position: absolute; left: 0; right: 0; top: 0; height: 150px; background: #14c4b8; border-bottom: 6px solid #16191d; text-align: center; }}
    [data-composition-id="%ID%"] .{p}-head b {{ display: block; margin-top: 56px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: {int(w * 0.085)}px; color: #fbfaf5; -webkit-text-stroke: 6px #16191d; paint-order: stroke fill; white-space: nowrap; }}
    [data-composition-id="%ID%"] .{p}-head small {{ display: block; margin-top: 2px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.14em; color: #16191d; }}
    [data-composition-id="%ID%"] .{p}-grid {{ position: absolute; left: 22px; right: 22px; top: 176px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }}
    [data-composition-id="%ID%"] .{p}-card {{ height: {int((h - 400) / 2)}px; border: 5px solid #16191d; border-radius: 20px; background: #ffffff; position: relative; overflow: hidden; }}
    [data-composition-id="%ID%"] .{p}-foto {{ position: absolute; left: 8px; right: 8px; top: 8px; bottom: 58px; background: rgba(20, 196, 184, 0.18); border-radius: 12px; }}
    [data-composition-id="%ID%"] .{p}-foto svg {{ width: 100%; height: 100%; }}
    [data-composition-id="%ID%"] .{p}-precio {{ position: absolute; left: 0; right: 0; bottom: 8px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 34px; color: #16191d; }}
    [data-composition-id="%ID%"] .{p}-boton {{ position: absolute; left: 26px; right: 26px; bottom: 30px; height: 84px; border: 5px solid #16191d; border-radius: 42px; background: #ff7a1a; text-align: center;
      font-family: "Lexend", sans-serif; font-weight: 900; font-size: 32px; line-height: 76px; color: #16191d; white-space: nowrap; }}
"""
