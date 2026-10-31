# Helpers para generar las escenas de reels/el-taxista (personajes y objetos repetidos).
# Cada sNN.py importa esto y llama escena(...): escribe compositions/<id>.html y <id>.sfx.json.
# Correr: cd partes/escenas && python3 sNN.py ; después node armar.mjs desde reels/el-taxista.
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
# paleta: negro noche, azul noche, amarillo taxi, rojo taxímetro, ámbar farola, crema, celeste celular, gris canas, verde Scalerics (solo final y WhatsApp)
K, N, Y, R, A, C, L, H, G = "#0b0f1a", "#1d2f55", "#ffc81a", "#ff3b30", "#ff9a3c", "#f4ecd8", "#7fd3ff", "#a9aebb", "#5ce611"
S = f'stroke="{K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"'


def taxista(p, mate=True):
    """Busto SVG 500x620 (hombros abajo). Clases: {p}-cuerpo, {p}-cabeza, {p}-ojos, {p}-ceja (svgOrigin 250 258),
    {p}-boca (escalar Y, svgOrigin 250 386), {p}-mate (mano izq. con el mate), {p}-dedo (mano der. con el índice arriba, opacity 0),
    {p}-pulgar (mano der. con el pulgar arriba, opacity 0)."""
    m = f'''<g class="{p}-mate">
    <path d="M100 470 Q92 430 112 404 L168 404 Q188 430 180 470 Q176 520 140 524 Q104 520 100 470 Z" fill="{A}" {S}/>
    <path d="M108 410 Q140 396 172 410" stroke="{K}" stroke-width="5" fill="none"/>
    <path d="M132 410 L120 330" stroke="{H}" stroke-width="10" stroke-linecap="round"/><path d="M132 410 L120 330" stroke="{K}" stroke-width="3" fill="none" opacity="0.4"/>
    <ellipse cx="160" cy="520" rx="44" ry="32" fill="{C}" {S}/></g>''' if mate else ""
    return f'''<svg viewBox="0 0 500 620" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M30 640 Q48 476 176 440 L324 440 Q452 476 470 640 Z" fill="{N}" {S}/>
  <path d="M200 440 L250 520 L300 440 Z" fill="{C}" {S}/>
  <path d="M176 440 L226 540 L206 446 Z M324 440 L274 540 L294 446 Z" fill="{N}" {S}/>
  <rect x="216" y="392" width="68" height="60" fill="{C}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="128" cy="298" r="26" fill="{C}" {S}/><circle cx="372" cy="298" r="26" fill="{C}" {S}/>
    <ellipse cx="250" cy="292" rx="122" ry="132" fill="{C}" {S}/>
    <path d="M132 236 Q124 300 150 330 Q150 280 168 250 Z M368 236 Q376 300 350 330 Q350 280 332 250 Z" fill="{H}" {S}/>
    <path d="M136 210 Q146 118 250 112 Q354 118 364 210 Z" fill="{N}" {S}/>
    <path d="M118 212 Q250 186 382 212 L388 234 Q250 208 112 234 Z" fill="{K}" {S}/>
    <rect x="226" y="138" width="48" height="26" rx="5" fill="{Y}" stroke="{K}" stroke-width="4"/>
    <g class="{p}-ceja"><path d="M180 254 Q205 240 232 252 M268 252 Q295 240 320 254" stroke="{H}" stroke-width="20" stroke-linecap="round" fill="none"/>
      <path d="M180 254 Q205 240 232 252 M268 252 Q295 240 320 254" stroke="{K}" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.5"/></g>
    <g class="{p}-ojos"><ellipse cx="207" cy="282" rx="9" ry="10" fill="{K}"/><ellipse cx="293" cy="282" rx="9" ry="10" fill="{K}"/></g>
    <path d="M190 296 Q207 304 224 296 M276 296 Q293 304 310 296" stroke="{K}" stroke-width="3" fill="none" opacity="0.45"/>
    <circle cx="168" cy="340" r="16" fill="{A}" opacity="0.35"/><circle cx="332" cy="340" r="16" fill="{A}" opacity="0.35"/>
    <ellipse cx="250" cy="322" rx="28" ry="24" fill="{C}" {S}/>
    <ellipse class="{p}-boca" cx="250" cy="388" rx="24" ry="9" fill="{K}"/>
    <path d="M168 360 Q206 330 250 348 Q294 330 332 360 Q330 392 296 380 Q272 370 250 374 Q228 370 204 380 Q170 392 168 360 Z" fill="{H}" {S}/>
  </g>
  {m}
  <g class="{p}-dedo" opacity="0"><path d="M360 640 L372 520" stroke="{K}" stroke-width="64" stroke-linecap="round"/><path d="M360 640 L372 520" stroke="{N}" stroke-width="50" stroke-linecap="round"/>
    <rect x="344" y="470" width="58" height="62" rx="20" fill="{C}" {S}/><rect x="360" y="400" width="22" height="80" rx="11" fill="{C}" {S}/></g>
  <g class="{p}-pulgar" opacity="0"><path d="M360 640 L372 520" stroke="{K}" stroke-width="64" stroke-linecap="round"/><path d="M360 640 L372 520" stroke="{N}" stroke-width="50" stroke-linecap="round"/>
    <rect x="340" y="470" width="66" height="62" rx="20" fill="{C}" {S}/><rect x="344" y="404" width="24" height="76" rx="12" fill="{C}" {S}/></g>
</g></svg>'''


def pasajera(p, cel=True):
    """Busto SVG 500x620. Clases: {p}-cuerpo, {p}-cabeza, {p}-ojos, {p}-ceja (svgOrigin 250 262), {p}-boca (escalar Y, svgOrigin 250 384),
    {p}-cel (mano con el celular que brilla), {p}-brillo (luz celeste en la cara)."""
    c = f'''<g class="{p}-cel"><rect x="318" y="430" width="110" height="196" rx="18" fill="{K}" {S}/>
    <rect x="328" y="442" width="90" height="170" rx="10" fill="{L}"/><path d="M344 470 H402 M344 492 H390 M344 514 H398" stroke="{K}" stroke-width="6" opacity="0.5"/>
    <ellipse cx="330" cy="560" rx="36" ry="30" fill="{C}" {S}/></g>''' if cel else ""
    return f'''<svg viewBox="0 0 500 620" aria-hidden="true"><g class="{p}-cuerpo">
  <path d="M40 640 Q60 480 180 446 L320 446 Q440 480 460 640 Z" fill="{A}" {S}/>
  <path d="M150 470 L210 640 M350 470 L290 640" stroke="{K}" stroke-width="5" opacity="0.5"/>
  <rect x="220" y="396" width="60" height="60" fill="{C}" {S}/>
  <path d="M176 446 Q250 500 324 446 Q336 486 300 500 Q250 520 200 500 Q164 486 176 446 Z" fill="{L}" {S}/>
  <g class="{p}-cabeza">
    <circle cx="250" cy="150" r="58" fill="{N}" {S}/>
    <path d="M136 300 Q120 190 250 178 Q380 190 364 300 L372 410 Q330 420 340 330 L160 330 Q170 420 128 410 Z" fill="{N}" {S}/>
    <ellipse cx="250" cy="300" rx="104" ry="118" fill="{C}" {S}/>
    <ellipse class="{p}-brillo" cx="250" cy="330" rx="96" ry="84" fill="{L}" opacity="0.08"/>
    <path d="M146 270 Q170 196 250 196 Q330 196 354 270 Q320 226 250 230 Q190 228 146 270 Z" fill="{N}" {S}/>
    <path d="M196 230 Q186 270 166 290" stroke="{N}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <circle cx="146" cy="352" r="12" fill="{Y}" stroke="{K}" stroke-width="4"/><circle cx="354" cy="352" r="12" fill="{Y}" stroke="{K}" stroke-width="4"/>
    <g class="{p}-ceja"><path d="M190 258 L232 270 M268 270 L310 258" stroke="{K}" stroke-width="9" stroke-linecap="round"/></g>
    <g class="{p}-ojos"><ellipse cx="212" cy="292" rx="9" ry="12" fill="{K}"/><ellipse cx="288" cy="292" rx="9" ry="12" fill="{K}"/></g>
    <path d="M198 286 L190 280 M302 286 L310 280" stroke="{K}" stroke-width="4" stroke-linecap="round"/>
    <path d="M250 300 Q240 330 252 336" stroke="{K}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="186" cy="340" r="13" fill="{R}" opacity="0.25"/><circle cx="314" cy="340" r="13" fill="{R}" opacity="0.25"/>
    <path class="{p}-boca" d="M226 376 Q250 366 274 376 Q274 398 250 400 Q226 398 226 376 Z" fill="{K}" stroke="{K}" stroke-width="4" stroke-linejoin="round"/>
  </g>
  {c}
</g></svg>'''


def local(p, cartel, color=A, cortina=False, luz=True):
    """SVG 640x640: fachada de pastelería con toldo a rayas del color dado. Clases: {p}-vidriera, {p}-puerta, {p}-cortina (scaleY desde arriba, svgOrigin 320 230)."""
    rayas = "".join(f'<path d="M{80 + i * 64} 150 L{112 + i * 64} 150 L{104 + i * 64} 236 L{72 + i * 64} 236 Z" fill="{C}"/>' for i in range(8))
    cort = f'''<g class="{p}-cortina"><rect x="70" y="236" width="500" height="372" fill="{H}" {S}/>
      {"".join(f'<path d="M74 {266 + i * 30} H566" stroke="{K}" stroke-width="4"/>' for i in range(11))}</g>''' if cortina else ""
    vid = L if luz else N
    return f'''<svg viewBox="0 0 640 640" aria-hidden="true">
  <rect x="50" y="56" width="540" height="560" fill="#24365c" {S}/>
  <rect x="70" y="68" width="500" height="74" rx="10" fill="{K}" stroke="{color}" stroke-width="5"/>
  <text x="320" y="122" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="{46 if len(cartel) < 16 else 38}" fill="{color}">{cartel}</text>
  <path d="M60 148 L580 148 L600 236 L40 236 Z" fill="{color}" {S}/>{rayas}
  <path d="M60 148 L580 148 L600 236 L40 236 Z" fill="none" {S}/>
  <g class="{p}-vidriera"><rect x="80" y="262" width="270" height="270" fill="{vid}" opacity="0.4" {S}/>
    <rect x="80" y="262" width="270" height="270" fill="none" stroke="{C}" stroke-width="6"/>
    <path d="M120 500 L120 450 L200 450 L200 500 Z M150 450 L150 420 L176 420 L176 450 Z" fill="{C}" opacity="0.85"/>
    <path d="M230 500 Q270 440 310 500 Z" fill="{C}" opacity="0.85"/></g>
  <g class="{p}-puerta"><rect x="390" y="290" width="150" height="320" fill="{K}" stroke="{C}" stroke-width="6"/>
    <rect x="408" y="308" width="114" height="150" fill="{vid}" opacity="0.35"/><circle cx="512" cy="480" r="9" fill="{Y}"/></g>
  <rect x="30" y="604" width="580" height="22" fill="{C}" {S}/>
  {cort}
</svg>'''


def torta(p, velas=True, color=A):
    """SVG 500x520 torta de tres pisos. Clases: {p}-llama (titilan), {p}-velas."""
    v = ""
    if velas:
        for x in (190, 250, 310):
            v += f'<rect x="{x - 9}" y="70" width="18" height="70" rx="5" fill="{Y}" stroke="{K}" stroke-width="4"/><path d="M{x - 9} 92 L{x + 9} 84 M{x - 9} 116 L{x + 9} 108" stroke="{R}" stroke-width="4"/>'
            v += f'<path class="{p}-llama" d="M{x} 22 Q{x + 16} 46 {x} 64 Q{x - 16} 46 {x} 22 Z" fill="{A}" stroke="{K}" stroke-width="4"/>'
    goteo = lambda x0, x1, y, n: "".join(f'<path d="M{x0 + (x1 - x0) * i / n} {y} q{(x1 - x0) / n / 2} 34 {(x1 - x0) / n} 0" fill="{C}" stroke="{K}" stroke-width="4"/>' for i in range(n))
    return f'''<svg viewBox="0 0 500 520" aria-hidden="true">
  <ellipse cx="250" cy="492" rx="230" ry="22" fill="{K}" opacity="0.5"/>
  <rect x="40" y="476" width="420" height="20" rx="10" fill="{H}" {S}/>
  <rect x="70" y="350" width="360" height="130" rx="14" fill="{color}" {S}/>{goteo(70, 430, 350, 6)}
  <rect x="110" y="240" width="280" height="116" rx="14" fill="{C}" {S}/>
  <path d="M110 300 H390" stroke="{R}" stroke-width="10"/>
  <rect x="150" y="140" width="200" height="104" rx="14" fill="{color}" {S}/>{goteo(150, 350, 140, 4)}
  <g class="{p}-velas">{v}</g>
  <circle cx="130" cy="420" r="10" fill="{R}" stroke="{K}" stroke-width="3"/><circle cx="250" cy="430" r="10" fill="{R}" stroke="{K}" stroke-width="3"/><circle cx="370" cy="420" r="10" fill="{R}" stroke="{K}" stroke-width="3"/>
</svg>'''


def taxi_arriba(p):
    """SVG 120x200: taxi visto desde arriba, trompa hacia arriba."""
    return f'''<svg viewBox="0 0 120 200" aria-hidden="true"><g class="{p}">
  <rect x="10" y="10" width="100" height="180" rx="28" fill="{Y}" {S}/>
  <rect x="24" y="44" width="72" height="34" rx="8" fill="{N}" stroke="{K}" stroke-width="4"/>
  <rect x="24" y="130" width="72" height="30" rx="8" fill="{N}" stroke="{K}" stroke-width="4"/>
  <rect x="38" y="92" width="44" height="26" rx="5" fill="{C}" stroke="{K}" stroke-width="4"/>
  <circle cx="30" cy="20" r="7" fill="{C}"/><circle cx="90" cy="20" r="7" fill="{C}"/>
</g></svg>'''


def destello(cls, x, y, r, color=Y):
    k = r * 0.26
    return f'<path class="{cls}" data-c="{x} {y}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}" stroke="{K}" stroke-width="4"/>'


def pin(color=R, x=0, y=0, s=1, cls=""):
    return f'<g class="{cls}" transform="translate({x} {y}) scale({s})"><path d="M0 0 C-50 -60 -50 -120 0 -120 C50 -120 50 -60 0 0 Z" fill="{color}" {S}/><circle cx="0" cy="-80" r="18" fill="{C}" stroke="{K}" stroke-width="5"/></g>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 500px; height: 620px; }
    [data-composition-id="%ID%"] .fig svg, [data-composition-id="%ID%"] .obj svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .obj { position: absolute; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap;
      letter-spacing: -0.02em; -webkit-text-stroke: 12px #0b0f1a; paint-order: stroke fill; }
    [data-composition-id="%ID%"] .big.c { color: #f4ecd8; text-shadow: 9px 9px 0 #ff3b30; }
    [data-composition-id="%ID%"] .big.y { color: #ffc81a; text-shadow: 9px 9px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .big.r { color: #ff3b30; text-shadow: 9px 9px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .big.a { color: #ff9a3c; text-shadow: 9px 9px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .big.l { color: #7fd3ff; text-shadow: 9px 9px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .big.v { color: #5ce611; text-shadow: 8px 8px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
    [data-composition-id="%ID%"] .sello { position: absolute; padding: 16px 40px 8px; border: 12px solid currentColor; border-radius: 20px; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; background: #0b0f1a; }
    [data-composition-id="%ID%"] .globo { position: absolute; padding: 20px 30px; border-radius: 30px; border: 6px solid #0b0f1a; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 44px; line-height: 1.12; white-space: nowrap; color: #0b0f1a; background: #f4ecd8; box-shadow: 8px 8px 0 #0b0f1a; }
    [data-composition-id="%ID%"] .cel { position: absolute; border-radius: 54px; border: 8px solid #0b0f1a; background: #0b0f1a; box-shadow: 0 0 0 6px #f4ecd8, 12px 12px 0 6px #0b0f1a, 0 0 90px 10px rgba(127, 211, 255, 0.35); }
    [data-composition-id="%ID%"] .cel-barra { position: absolute; left: 50%; top: 14px; width: 110px; height: 22px; margin-left: -55px; border-radius: 12px; background: #0b0f1a; z-index: 2; }
    [data-composition-id="%ID%"] .cel-pant { position: absolute; left: 6px; top: 6px; right: 6px; bottom: 6px; border-radius: 46px; background: #f4ecd8; overflow: hidden; }
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
      const habla = (sel, t, d, origin) => tl.fromTo(q(sel), { scaleY: 1, svgOrigin: origin }, { scaleY: 2.1, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }, t);
      // respira / rebota suave
      const vaiven = (el, t, d, vars, per = 0.4) => tl.to(el, Object.assign({ duration: per, yoyo: true, repeat: Math.max(1, Math.floor(d / per)) | 1, ease: "sine.inOut" }, vars), t);
      // el auto que traquetea (todo lo de adentro del taxi se mueve un poquito)
      const traqueteo = (el, t, d) => tl.to(el, { y: "+=5", duration: 0.13, yoyo: true, repeat: Math.max(1, Math.floor(d / 0.13)) | 1, ease: "sine.inOut" }, t);
      // parpadeo de ojos
      // destellos (path con data-c = centro) que aparecen y giran
      const brilla = (els, t, paso = 0.08) => els.forEach((e, i) => { gsap.set(e, { opacity: 0 }); tl.fromTo(e, { opacity: 0, scale: 0, rotation: -40, svgOrigin: e.dataset.c }, { opacity: 1, scale: 1, rotation: 0, svgOrigin: e.dataset.c, duration: 0.28, ease: "back.out(3)", immediateRender: false }, t + i * paso);
        tl.to(e, { scale: 0.75, svgOrigin: e.dataset.c, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, t + i * paso + 0.3); });
      const parpadea = (sel, t, origin) => { tl.to(q(sel), { scaleY: 0.1, svgOrigin: origin, duration: 0.06 }, t); tl.to(q(sel), { scaleY: 1, svgOrigin: origin, duration: 0.08 }, t + 0.08); };
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


def celular(cls, w, h, pantalla, x, y):
    return f'<div class="cel {cls}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px"><div class="cel-barra"></div><div class="cel-pant">{pantalla}</div></div>'


def sitio(p, nombre, color=Y, wa=G):
    """Pantalla de un sitio web de pastelería (va adentro de .cel-pant). Clases: {p}-head, {p}-hor, {p}-mapa, {p}-wa."""
    return f'''<div class="{p}-head"><b>{nombre}</b><small>PASTELERÍA · TORTAS POR ENCARGO</small></div>
  <div class="{p}-fila {p}-hor"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="none" stroke="{K}" stroke-width="6"/><path d="M30 16 V30 L40 36" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/></svg><span><b>ABIERTO HOY</b>de 9 a 21 h</span></div>
  <div class="{p}-fila {p}-mapa"><svg viewBox="0 0 60 60"><path d="M30 54 C10 32 10 8 30 8 C50 8 50 32 30 54 Z" fill="{R}" stroke="{K}" stroke-width="5"/><circle cx="30" cy="26" r="8" fill="{C}"/></svg><span><b>CÓMO LLEGAR</b>frente a la plaza</span></div>
  <div class="{p}-wa">PEDIR POR WHATSAPP</div>'''


def css_sitio(p, color=Y, wa=G):
    return f"""
    [data-composition-id="%ID%"] .{p}-head {{ position: absolute; left: 0; right: 0; top: 0; height: 210px; background: {color}; border-bottom: 6px solid #0b0f1a; text-align: center; }}
    [data-composition-id="%ID%"] .{p}-head b {{ display: block; margin-top: 68px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 1.05; color: #0b0f1a; white-space: nowrap; }}
    [data-composition-id="%ID%"] .{p}-head small {{ display: block; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 20px; letter-spacing: 0.08em; color: #0b0f1a; }}
    [data-composition-id="%ID%"] .{p}-fila {{ position: absolute; left: 26px; right: 26px; height: 130px; border: 5px solid #0b0f1a; border-radius: 24px; background: #fff; }}
    [data-composition-id="%ID%"] .{p}-fila svg {{ position: absolute; left: 22px; top: 30px; width: 64px; height: 64px; }}
    [data-composition-id="%ID%"] .{p}-fila span {{ position: absolute; left: 104px; top: 22px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: #1d2f55; white-space: nowrap; }}
    [data-composition-id="%ID%"] .{p}-fila span b {{ display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 36px; color: #0b0f1a; margin-bottom: 4px; }}
    [data-composition-id="%ID%"] .{p}-hor {{ top: 240px; }}
    [data-composition-id="%ID%"] .{p}-mapa {{ top: 395px; }}
    [data-composition-id="%ID%"] .{p}-wa {{ position: absolute; left: 26px; right: 26px; bottom: 40px; height: 100px; border: 6px solid #0b0f1a; border-radius: 50px; background: {wa}; text-align: center;
      font-family: "Lexend", sans-serif; font-weight: 900; font-size: 32px; line-height: 88px; color: #0b0f1a; white-space: nowrap; }}
"""
