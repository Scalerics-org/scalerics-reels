# Helpers para generar las escenas de reels/yo-del-futuro (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
K, W, V, M, C, N, G = "#120621", "#fdf6ff", "#7b2ff7", "#ff2a9d", "#22e4ff", "#ff8a3d", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'


def futuro(p):
    """El yo del futuro. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292),
    {p}-bd (svgOrigin 250 292; dedo índice que señala), {p}-boca (escalar Y, origin 200 240), {p}-ojos,
    {p}-cabeza, {p}-canas (mechones; para erizar escalar con svgOrigin 200 170), {p}-lentes (opacity 0),
    {p}-antiparras."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M174 480 L170 690 M226 480 L230 690" stroke="{K}" stroke-width="48" stroke-linecap="round" fill="none"/>
  <path d="M174 480 L170 690 M226 480 L230 690" stroke="#3a1a5c" stroke-width="34" stroke-linecap="round" fill="none"/>
  <ellipse cx="160" cy="700" rx="34" ry="15" fill="{W}" {S}/><ellipse cx="240" cy="700" rx="34" ry="15" fill="{W}" {S}/>
  <g class="{p}-bi">
    <path d="M150 292 L114 392 L118 466" stroke="{K}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M150 292 L114 392 L118 466" stroke="{M}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="118" cy="476" r="19" fill="{W}" {S}/>
  </g>
  <g class="{p}-bd">
    <path d="M250 292 L286 392 L282 466" stroke="{K}" stroke-width="46" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M250 292 L286 392 L282 466" stroke="{M}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="282" cy="476" r="19" fill="{W}" {S}/>
    <path d="M282 492 L282 528" stroke="{K}" stroke-width="20" stroke-linecap="round"/><path d="M282 492 L282 528" stroke="{W}" stroke-width="9" stroke-linecap="round"/>
  </g>
  <path d="M136 280 Q200 262 264 280 Q282 390 272 500 Q200 514 128 500 Q118 390 136 280 Z" fill="{M}" {S}/>
  <path d="M180 278 L200 330 L220 278 Z" fill="{W}" {S}/>
  <path d="M200 330 V500" stroke="{K}" stroke-width="5"/>
  <path d="M140 330 H176 M224 330 H260" stroke="{N}" stroke-width="10" stroke-linecap="round"/>
  <path d="M136 280 Q170 300 180 278 M264 280 Q230 300 220 278" fill="none" stroke="{K}" stroke-width="5"/>
  <rect x="184" y="240" width="32" height="34" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <ellipse cx="200" cy="192" rx="64" ry="70" fill="{W}" {S}/>
    <g class="{p}-canas">
      <path d="M140 196 Q112 186 118 160 Q100 150 116 128 Q112 108 138 110 Q140 140 146 160 Z" fill="{W}" {S}/>
      <path d="M260 196 Q288 186 282 160 Q300 150 284 128 Q288 108 262 110 Q260 140 254 160 Z" fill="{W}" {S}/>
      <path d="M176 126 Q170 104 182 96 M200 124 Q200 98 210 92 M222 128 Q230 108 240 104" stroke="{K}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>
    <circle cx="134" cy="204" r="14" fill="{W}" {S}/><circle cx="266" cy="204" r="14" fill="{W}" {S}/>
    <path d="M164 160 Q180 156 194 164 M206 164 Q220 156 236 160" stroke="{K}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g class="{p}-antiparras">
      <path d="M140 140 Q200 122 260 140" stroke="{K}" stroke-width="12" fill="none"/>
      <rect x="152" y="118" width="40" height="30" rx="12" fill="{N}" {S}/><rect x="208" y="118" width="40" height="30" rx="12" fill="{N}" {S}/>
      <path d="M160 126 L172 126" stroke="{W}" stroke-width="5" stroke-linecap="round"/><path d="M216 126 L228 126" stroke="{W}" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g class="{p}-ojos"><ellipse cx="178" cy="188" rx="6" ry="7" fill="{K}"/><ellipse cx="222" cy="188" rx="6" ry="7" fill="{K}"/></g>
    <path d="M166 200 Q178 208 190 200 M210 200 Q222 208 234 200" stroke="{V}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M166 174 L192 178 M208 178 L234 174" stroke="{W}" stroke-width="12" stroke-linecap="round"/>
    <path d="M166 174 L192 178 M208 178 L234 174" stroke="{K}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
    <path d="M200 194 Q192 214 202 218" stroke="{K}" stroke-width="4" fill="none"/>
    <path d="M150 224 Q156 232 160 226 M240 224 Q244 232 250 226" stroke="{K}" stroke-width="3" fill="none" opacity="0.5"/>
    <ellipse class="{p}-boca" cx="200" cy="244" rx="15" ry="5" fill="{K}"/>
    <path d="M162 230 Q182 214 200 224 Q218 214 238 230 Q226 240 200 234 Q174 240 162 230 Z" fill="{W}" {S}/>
    <g class="{p}-lentes" opacity="0">
      <path d="M148 182 H252" stroke="{K}" stroke-width="10"/>
      <path d="M150 176 H194 L190 204 Q172 212 156 204 Z M206 176 H250 L244 204 Q228 212 210 204 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
      <path d="M160 184 L176 184 M216 184 L232 184" stroke="{C}" stroke-width="5" stroke-linecap="round"/>
    </g>
  </g>
</g></svg>'''


def hoy(p):
    """El dueño de hoy. SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi (svgOrigin 150 292),
    {p}-bd (svgOrigin 250 292), {p}-boca (sonrisa nerviosa, escalar Y origin 200 240), {p}-boca-o
    (boca de susto, opacity 0), {p}-ojos, {p}-cabeza, {p}-susto (líneas de susto, opacity 0), {p}-gota (opacity 0)."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M176 480 L172 690 M224 480 L228 690" stroke="{K}" stroke-width="46" stroke-linecap="round" fill="none"/>
  <path d="M176 480 L172 690 M224 480 L228 690" stroke="{V}" stroke-width="32" stroke-linecap="round" fill="none"/>
  <ellipse cx="160" cy="700" rx="32" ry="14" fill="{K}"/><ellipse cx="240" cy="700" rx="32" ry="14" fill="{K}"/>
  <g class="{p}-bi">
    <path d="M150 292 L116 392 L120 466" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M150 292 L116 392 L120 466" stroke="{W}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="120" cy="476" r="18" fill="{W}" {S}/>
  </g>
  <g class="{p}-bd">
    <path d="M250 292 L284 392 L280 466" stroke="{K}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M250 292 L284 392 L280 466" stroke="{W}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="280" cy="476" r="18" fill="{W}" {S}/>
  </g>
  <path d="M140 280 Q200 264 260 280 Q276 390 268 496 Q200 510 132 496 Q124 390 140 280 Z" fill="{W}" {S}/>
  <path d="M156 330 Q200 320 244 330 L258 500 Q200 512 142 500 Z" fill="{C}" {S}/>
  <path d="M156 330 L170 282 M244 330 L230 282" stroke="{C}" stroke-width="10"/>
  <rect x="176" y="390" width="48" height="40" rx="6" fill="none" stroke="{K}" stroke-width="5"/>
  <rect x="186" y="244" width="28" height="30" fill="{W}" {S}/>
  <g class="{p}-cabeza">
    <path d="M136 186 Q128 108 200 104 Q272 108 264 186 Z" fill="{K}" {S}/>
    <ellipse cx="200" cy="196" rx="60" ry="64" fill="{W}" {S}/>
    <path d="M140 172 Q150 120 200 120 Q246 118 262 160 Q236 140 220 150 Q200 132 176 150 Q160 140 140 172 Z" fill="{K}" {S}/>
    <circle cx="140" cy="204" r="13" fill="{W}" {S}/><circle cx="260" cy="204" r="13" fill="{W}" {S}/>
    <g class="{p}-ojos"><ellipse cx="178" cy="196" rx="8" ry="10" fill="{K}"/><ellipse cx="222" cy="196" rx="8" ry="10" fill="{K}"/>
      <circle cx="181" cy="192" r="3" fill="{W}"/><circle cx="225" cy="192" r="3" fill="{W}"/></g>
    <path d="M164 174 L190 170 M210 170 L236 174" stroke="{K}" stroke-width="6" stroke-linecap="round"/>
    <path d="M200 200 Q194 214 202 218" stroke="{K}" stroke-width="4" fill="none"/>
    <path class="{p}-boca" d="M180 234 Q200 250 220 234" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse class="{p}-boca-o" cx="200" cy="240" rx="14" ry="18" fill="{K}" opacity="0"/>
    <path class="{p}-gota" d="M262 150 Q274 170 266 178 Q256 182 254 172 Q254 162 262 150 Z" fill="{C}" stroke="{K}" stroke-width="3" opacity="0"/>
    <g class="{p}-susto" opacity="0">
      <path d="M120 120 L96 92 M146 96 L134 62 M200 86 V48 M254 96 L266 62 M280 120 L304 92" stroke="{C}" stroke-width="8" stroke-linecap="round"/>
    </g>
  </g>
</g></svg>'''


def mostrador(p, ancho=900):
    """SVG {ancho}x300: mostrador neón. Clase {p}-neon (borde que titila)."""
    a = ancho
    return f'''<svg viewBox="0 0 {a} 300" aria-hidden="true">
  <rect x="10" y="20" width="{a - 20}" height="40" rx="8" fill="{W}" {S}/>
  <rect x="30" y="60" width="{a - 60}" height="232" fill="#2a1046" {S}/>
  <path class="{p}-neon" d="M60 100 H{a - 60} M60 250 H{a - 60}" stroke="{M}" stroke-width="10" stroke-linecap="round"/>
  <path d="M60 175 H{a - 60}" stroke="{C}" stroke-width="6" stroke-dasharray="40 26" opacity="0.8"/>
</svg>'''


def fiat(p):
    """Auto chiquito cuadrado genérico (sin marca), vista de costado, SVG 700x380, ruedas en y~320.
    Clases: {p}-rueda, {p}-humo (opacity 0), {p}-farol."""
    return f'''<svg viewBox="0 0 700 380" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M40 300 L40 210 Q40 190 70 186 L170 176 L240 96 Q250 84 270 84 L470 84 Q490 84 498 104 L540 186 L640 196 Q670 200 670 230 L670 300 Z" fill="{N}" {S}/>
  <path d="M262 108 L208 180 L360 180 L360 108 Z" fill="{C}" {S}/>
  <path d="M384 108 L384 180 L512 180 L476 108 Z" fill="{C}" {S}/>
  <path d="M272 120 L250 150 M398 120 L398 150" stroke="{W}" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  <path d="M372 96 V296" stroke="{K}" stroke-width="5"/>
  <path d="M40 236 H670" stroke="{K}" stroke-width="5"/>
  <path d="M40 252 H670" stroke="{M}" stroke-width="10"/>
  <rect class="{p}-farol" x="640" y="206" width="30" height="24" rx="6" fill="{W}" {S}/>
  <rect x="34" y="210" width="20" height="26" rx="4" fill="{M}" {S}/>
  <rect x="300" y="200" width="40" height="10" rx="4" fill="{K}"/><rect x="420" y="200" width="40" height="10" rx="4" fill="{K}"/>
  <g class="{p}-rueda"><circle cx="170" cy="312" r="52" fill="{K}" stroke="{W}" stroke-width="5"/><circle cx="170" cy="312" r="20" fill="{W}"/><path d="M170 266 V358 M124 312 H216" stroke="{W}" stroke-width="5"/></g>
  <g class="{p}-rueda"><circle cx="540" cy="312" r="52" fill="{K}" stroke="{W}" stroke-width="5"/><circle cx="540" cy="312" r="20" fill="{W}"/><path d="M540 266 V358 M494 312 H586" stroke="{W}" stroke-width="5"/></g>
  <g class="{p}-humo" opacity="0"><circle cx="20" cy="290" r="26" fill="{V}" opacity="0.7"/><circle cx="-20" cy="270" r="34" fill="{V}" opacity="0.5"/><circle cx="-70" cy="250" r="42" fill="{V}" opacity="0.35"/></g>
</g></svg>'''


def fuego(cls, largo=520):
    """Huellas de fuego: dos franjas de llamas horizontales (SVG largo x 120). Escalar X desde la derecha."""
    llamas = "".join(f'<path d="M{x} 40 Q{x + 14} 0 {x + 30} 26 Q{x + 40} 6 {x + 54} 40 Z" fill="{N}"/>' for x in range(0, largo - 40, 46))
    llamas2 = "".join(f'<path d="M{x} 100 Q{x + 14} 60 {x + 30} 86 Q{x + 40} 66 {x + 54} 100 Z" fill="{N}"/>' for x in range(0, largo - 40, 46))
    return f'''<svg class="{cls}" viewBox="0 0 {largo} 120" aria-hidden="true">
  <rect x="0" y="34" width="{largo}" height="14" rx="7" fill="{M}"/><rect x="0" y="94" width="{largo}" height="14" rx="7" fill="{M}"/>
  {llamas}{llamas2}
  <rect x="0" y="38" width="{largo}" height="6" rx="3" fill="{W}"/><rect x="0" y="98" width="{largo}" height="6" rx="3" fill="{W}"/>
</svg>'''


def chispas(cls, cx, cy, r=220, n=8, color=C):
    """Rayos en zigzag alrededor de (cx, cy). Cada rayo con clase {cls}."""
    import math
    out = ""
    for i in range(n):
        a = i * 2 * math.pi / n + 0.3
        pts = []
        for k in range(5):
            rr = r * (0.35 + 0.17 * k)
            off = (16 if k % 2 else -16)
            pts.append((cx + rr * math.cos(a) + off * math.sin(a), cy + rr * math.sin(a) - off * math.cos(a)))
        d = "M" + " L".join(f"{x:.0f} {y:.0f}" for x, y in pts)
        out += f'<path class="{cls}" d="{d}" fill="none" stroke="{color}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>'
        out += f'<path class="{cls}" d="{d}" fill="none" stroke="{W}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
    return out


def humo(cls, cx, cy, r=60):
    bolas = [(-1.6, 0.2, 0.9), (-0.8, -0.4, 1.1), (0, 0.1, 1.3), (0.9, -0.3, 1.0), (1.7, 0.2, 0.8)]
    return "".join(f'<circle class="{cls}" cx="{cx + dx * r:.0f}" cy="{cy + dy * r:.0f}" r="{r * s:.0f}" fill="{V}" opacity="0.55"/>' for dx, dy, s in bolas)


def agente(p, color=C):
    """El agente de IA: holograma con forma de persona y auricular. SVG 400x720.
    Clases: {p}-cuerpo, {p}-bd (svgOrigin 250 292, saluda), {p}-lineas (scanlines), {p}-boca, {p}-ojos."""
    rayas = "".join(f'<path d="M110 {y} H290" stroke="{color}" stroke-width="3" opacity="0.5"/>' for y in range(130, 520, 22))
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <ellipse cx="200" cy="690" rx="150" ry="26" fill="{color}" opacity="0.35"/>
  <ellipse cx="200" cy="690" rx="110" ry="16" fill="none" stroke="{color}" stroke-width="5"/>
  <path d="M200 520 L200 680" stroke="{color}" stroke-width="5" stroke-dasharray="10 12"/>
  <g class="{p}-bi"><path d="M148 300 L118 396 L124 470" stroke="{color}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.45"/>
    <path d="M148 300 L118 396 L124 470" stroke="{W}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
  <g class="{p}-bd"><path d="M252 300 L282 396 L276 470" stroke="{color}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.45"/>
    <path d="M252 300 L282 396 L276 470" stroke="{W}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>
  <path d="M136 290 Q200 270 264 290 L274 520 Q200 540 126 520 Z" fill="{color}" fill-opacity="0.3" stroke="{color}" stroke-width="7" stroke-linejoin="round"/>
  <ellipse cx="200" cy="190" rx="68" ry="74" fill="{color}" fill-opacity="0.3" stroke="{color}" stroke-width="7"/>
  <g class="{p}-lineas">{rayas}</g>
  <path d="M128 190 Q128 104 200 104 Q272 104 272 190" fill="none" stroke="{W}" stroke-width="8"/>
  <rect x="116" y="170" width="26" height="50" rx="10" fill="{W}" stroke="{color}" stroke-width="5"/><rect x="258" y="170" width="26" height="50" rx="10" fill="{W}" stroke="{color}" stroke-width="5"/>
  <path d="M130 220 Q140 262 186 258" fill="none" stroke="{W}" stroke-width="6" stroke-linecap="round"/><circle cx="190" cy="258" r="9" fill="{W}"/>
  <g class="{p}-ojos"><rect x="168" y="172" width="18" height="30" rx="9" fill="{W}"/><rect x="214" y="172" width="18" height="30" rx="9" fill="{W}"/></g>
  <path class="{p}-boca" d="M178 226 Q200 244 222 226" stroke="{W}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M176 330 H224 M170 360 H230" stroke="{W}" stroke-width="5" stroke-linecap="round" opacity="0.8"/>
</g></svg>'''


def estrellita(cls, x, y, r, color=W):
    k = r * 0.26
    return f'<path class="{cls}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}"/>'


def celular(p, w=440, h=820):
    """Marco de celular (div). Adentro un div .{p}-pantalla para llenar (estilos en CSS_COMUN: .cel, .pant)."""
    return f'<div class="cel {p}-cel" style="width:{w}px;height:{h}px"><div class="cel-barra"></div><div class="pant {p}-pantalla">%PANT%</div></div>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 400px; height: 720px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; }
    [data-composition-id="%ID%"] .big span { display: inline-block; padding: 0 30px; transform: skewX(-8deg); color: transparent; -webkit-background-clip: text; background-clip: text;
      -webkit-text-stroke: 4px #120621; filter: drop-shadow(8px 8px 0 #7b2ff7) drop-shadow(0 0 22px rgba(255, 42, 157, 0.7)); }
    [data-composition-id="%ID%"] .big.cr span { background-image: linear-gradient(180deg, #fdf6ff 0%, #fdf6ff 42%, #22e4ff 52%, #7b2ff7 100%); }
    [data-composition-id="%ID%"] .big.mg span { background-image: linear-gradient(180deg, #ffe3f1 0%, #ff2a9d 50%, #ff8a3d 100%); }
    [data-composition-id="%ID%"] .big.nj span { background-image: linear-gradient(180deg, #fdf6ff 0%, #ffd2b3 38%, #ff8a3d 55%, #ff2a9d 100%); }
    [data-composition-id="%ID%"] .big.cy span { background-image: linear-gradient(180deg, #fdf6ff 0%, #22e4ff 55%, #7b2ff7 100%); filter: drop-shadow(8px 8px 0 #120621) drop-shadow(0 0 22px rgba(34, 228, 255, 0.7)); }
    [data-composition-id="%ID%"] .big.vd span { background-image: linear-gradient(180deg, #fdf6ff 0%, #5ce611 60%, #2f8a08 100%); filter: drop-shadow(8px 8px 0 #120621) drop-shadow(0 0 22px rgba(92, 230, 17, 0.6)); }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
    [data-composition-id="%ID%"] .reloj { position: absolute; padding: 16px 30px 12px; border: 6px solid #120621; border-radius: 18px; background: #120621; box-shadow: 0 0 0 4px #ff2a9d, 0 0 40px 6px rgba(255, 42, 157, 0.45);
      font-family: "IBM Plex Mono", monospace; font-weight: 600; line-height: 1; white-space: nowrap; color: #ff8a3d; text-shadow: 0 0 18px rgba(255, 138, 61, 0.9); text-align: center; }
    [data-composition-id="%ID%"] .reloj small { display: block; font-size: 26px; letter-spacing: 0.24em; color: #22e4ff; text-shadow: 0 0 10px rgba(34, 228, 255, 0.8); margin-bottom: 8px; }
    [data-composition-id="%ID%"] .reloj.cy { color: #22e4ff; text-shadow: 0 0 18px rgba(34, 228, 255, 0.9); box-shadow: 0 0 0 4px #22e4ff, 0 0 40px 6px rgba(34, 228, 255, 0.4); }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 16px 40px 10px; border: 10px solid currentColor; border-radius: 20px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #120621;
      box-shadow: 0 0 30px 4px currentColor; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 22px 32px; border-radius: 30px; border: 6px solid #120621; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 46px; line-height: 1.12; white-space: nowrap; color: #120621; background: #fdf6ff; box-shadow: 8px 8px 0 #7b2ff7; }
    [data-composition-id="%ID%"] .cel { position: absolute; border-radius: 54px; border: 8px solid #120621; background: #120621; box-shadow: 0 0 0 6px #22e4ff, 0 0 50px 10px rgba(34, 228, 255, 0.35); }
    [data-composition-id="%ID%"] .cel-barra { position: absolute; left: 50%; top: 14px; width: 110px; height: 22px; margin-left: -55px; border-radius: 12px; background: #120621; z-index: 2; }
    [data-composition-id="%ID%"] .pant { position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: 46px; background: #1d0b36; overflow: hidden; }
    [data-composition-id="%ID%"] .chat-head { position: absolute; left: 0; right: 0; top: 0; height: 130px; background: #2a1046; border-bottom: 4px solid #22e4ff; }
    [data-composition-id="%ID%"] .chat-head b { position: absolute; left: 110px; top: 54px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; color: #fdf6ff; }
    [data-composition-id="%ID%"] .chat-head i { position: absolute; left: 30px; top: 46px; width: 62px; height: 62px; border-radius: 50%; background: #ff2a9d; border: 4px solid #fdf6ff; }
    [data-composition-id="%ID%"] .msg { position: absolute; left: 26px; max-width: 360px; padding: 16px 22px; border-radius: 26px 26px 26px 6px; background: #fdf6ff; border: 4px solid #120621;
      font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; line-height: 1.15; color: #120621; white-space: nowrap; }
    [data-composition-id="%ID%"] .msg.yo { left: auto; right: 26px; border-radius: 26px 26px 6px 26px; background: #22e4ff; }
    [data-composition-id="%ID%"] .msg small { display: block; margin-top: 6px; font-family: "IBM Plex Mono", monospace; font-size: 24px; font-weight: 600; color: #5a3b80; text-align: right; }
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
      const habla = (sel, t, d, origin) => tl.fromTo(q(sel), { scaleY: 1, svgOrigin: origin }, { scaleY: 2.2, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }, t);
      // respira / rebota suave
      const vaiven = (el, t, d, vars, per = 0.4) => tl.to(el, Object.assign({ duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)) | 1, ease: "sine.inOut" }, vars), t);
      // chispazo: los elementos titilan de t a t+d
      const chispazo = (els, t, d = 0.6) => { gsap.set(els, { opacity: 0 }); tl.fromTo(els, { opacity: 1 }, { opacity: 0, duration: 0.06, ease: "steps(1)", yoyo: true, repeat: Math.max(1, Math.round(d / 0.06)) | 1, stagger: 0.02, immediateRender: false }, t); tl.set(els, { opacity: 0 }, t + d + 0.2); };
      // cuenta: varios <span> apilados (posición absoluta); se ve uno a la vez y frena en el último
      const cuenta = (els, t, paso = 0.06) => { gsap.set(els, { opacity: 0 }); els.forEach((e, i) => { tl.set(e, { opacity: 1 }, t + i * paso); if (i < els.length - 1) tl.set(e, { opacity: 0 }, t + (i + 1) * paso); }); };
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


def pulgar(cls="", color=C):
    """Mano con el pulgar arriba, SVG 300x300."""
    return f'''<svg class="{cls}" viewBox="0 0 300 300" aria-hidden="true">
  <path d="M96 140 L96 60 Q96 20 130 24 Q156 28 150 70 L142 120 L232 120 Q266 122 262 156 Q276 172 260 194 Q272 212 252 232 Q262 256 230 266 L120 266 Q96 266 96 240 Z" fill="{color}" {S}/>
  <path d="M190 160 H256 M186 198 H256 M182 234 H244" stroke="{K}" stroke-width="5" stroke-linecap="round"/>
  <rect x="34" y="128" width="64" height="148" rx="12" fill="{V}" {S}/>
</svg>'''


def hija(p):
    """La hija: nena chiquita con gorrito de cumpleaños y colitas. SVG 260x460. Clases {p}-cabeza, {p}-boca (soplar, scale)."""
    return f'''<svg viewBox="0 0 260 460" aria-hidden="true">
  <path d="M110 330 L106 440 M150 330 L154 440" stroke="{K}" stroke-width="30" stroke-linecap="round"/>
  <path d="M110 330 L106 440 M150 330 L154 440" stroke="{W}" stroke-width="18" stroke-linecap="round"/>
  <path d="M90 230 Q130 214 170 230 L206 350 Q130 366 54 350 Z" fill="{C}" {S}/>
  <path d="M96 236 L70 300 M164 236 L190 300" stroke="{K}" stroke-width="28" stroke-linecap="round"/><path d="M96 236 L70 300 M164 236 L190 300" stroke="{W}" stroke-width="16" stroke-linecap="round"/>
  <g class="{p}-cabeza">
    <circle cx="66" cy="150" r="26" fill="{K}"/><circle cx="194" cy="150" r="26" fill="{K}"/>
    <circle cx="130" cy="160" r="58" fill="{W}" {S}/>
    <path d="M74 140 Q90 100 130 102 Q170 100 186 140 Q160 120 130 126 Q100 120 74 140 Z" fill="{K}"/>
    <circle cx="110" cy="164" r="6" fill="{K}"/><circle cx="150" cy="164" r="6" fill="{K}"/>
    <circle class="{p}-boca" cx="130" cy="192" r="9" fill="{K}"/>
    <path d="M100 108 L130 18 L160 108 Z" fill="{M}" {S}/><circle cx="130" cy="18" r="12" fill="{N}" {S}/>
    <path d="M112 76 L148 76 M106 94 L154 94" stroke="{W}" stroke-width="6"/>
  </g>
</svg>'''
