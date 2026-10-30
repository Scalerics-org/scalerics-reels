# Helpers para generar las escenas de reels/aerobicos (figuras repetidas: instructora y dueño).
import json, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")
D, C, R, T, A, V, G = "#160a2a", "#fff3e8", "#ff2e88", "#1de9d6", "#ffe14d", "#5b2a86", "#5ce611"


def instructora(p):
    """SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi / {p}-bd (brazos, rotar con svgOrigin hombro
    158 272 / 242 272), {p}-boca-ok / {p}-boca-o (expresiones), {p}-ojos."""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <g class="{p}-piernas">
    <path d="M178 450 L165 690 M222 450 L235 690" stroke="{D}" stroke-width="54" stroke-linecap="round" fill="none"/>
    <path d="M178 450 L165 690 M222 450 L235 690" stroke="{V}" stroke-width="40" stroke-linecap="round" fill="none"/>
    <path d="M169 592 L165 668 M231 592 L235 668" stroke="{D}" stroke-width="64" stroke-linecap="butt" fill="none"/>
    <path d="M169 594 L165 666 M231 594 L235 666" stroke="{T}" stroke-width="52" stroke-linecap="butt" fill="none"/>
    <path d="M143 612 H191 M142 630 H190 M142 648 H189 M209 612 H257 M210 630 H258 M211 648 H259" stroke="{D}" stroke-width="3" opacity="0.5"/>
    <ellipse cx="152" cy="698" rx="36" ry="17" fill="{C}" stroke="{D}" stroke-width="6"/>
    <ellipse cx="248" cy="698" rx="36" ry="17" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <g class="{p}-bi">
    <path d="M158 272 L126 368 L116 452" stroke="{D}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M158 272 L126 368 L116 452" stroke="{C}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M110 430 L124 432" stroke="{T}" stroke-width="22" stroke-linecap="round"/>
    <circle cx="116" cy="462" r="17" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <g class="{p}-bd">
    <path d="M242 272 L274 368 L284 452" stroke="{D}" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M242 272 L274 368 L284 452" stroke="{C}" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M276 430 L290 432" stroke="{T}" stroke-width="22" stroke-linecap="round"/>
    <circle cx="284" cy="462" r="17" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <path d="M150 262 Q200 248 250 262 L242 384 L262 446 Q200 482 138 446 L158 384 Z" fill="{R}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M154 330 L246 296 L244 322 L156 356 Z" fill="{A}"/>
  <path d="M138 446 Q200 482 262 446 L250 470 Q200 500 150 470 Z" fill="{V}" stroke="{D}" stroke-width="5"/>
  <rect x="189" y="226" width="22" height="34" fill="{C}" stroke="{D}" stroke-width="5"/>
  <g class="{p}-cabeza">
    <circle cx="200" cy="168" r="74" fill="{A}" stroke="{D}" stroke-width="6"/>
    <circle cx="136" cy="200" r="42" fill="{A}" stroke="{D}" stroke-width="6"/>
    <circle cx="264" cy="200" r="42" fill="{A}" stroke="{D}" stroke-width="6"/>
    <circle cx="130" cy="236" r="28" fill="{A}" stroke="{D}" stroke-width="6"/>
    <circle cx="270" cy="236" r="28" fill="{A}" stroke="{D}" stroke-width="6"/>
    <circle cx="200" cy="196" r="50" fill="{C}" stroke="{D}" stroke-width="6"/>
    <path d="M150 160 Q200 128 250 160" stroke="{D}" stroke-width="28" fill="none" stroke-linecap="round"/>
    <path d="M150 160 Q200 128 250 160" stroke="{T}" stroke-width="17" fill="none" stroke-linecap="round"/>
    <path d="M168 150 Q184 140 196 150 Q210 138 228 150" stroke="{A}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <g class="{p}-ojos"><circle cx="182" cy="192" r="6" fill="{D}"/><circle cx="218" cy="192" r="6" fill="{D}"/></g>
    <path d="M172 180 L190 184 M210 184 L228 180" stroke="{D}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="170" cy="210" r="9" fill="{R}" opacity="0.45"/><circle cx="230" cy="210" r="9" fill="{R}" opacity="0.45"/>
    <path class="{p}-boca-ok" d="M180 210 Q200 236 220 210 Z" fill="{D}" stroke="{D}" stroke-width="4" stroke-linejoin="round"/>
    <path class="{p}-boca-ok" d="M186 213 H214" stroke="{C}" stroke-width="5"/>
    <path class="{p}-boca-o" d="M190 220 H210" stroke="{D}" stroke-width="6" stroke-linecap="round" opacity="0"/>
  </g>
</g></svg>'''


def duenio(p, tel=False):
    """SVG 400x720, pies en y~705. Clases: {p}-cuerpo, {p}-bi / {p}-bd (svgOrigin hombros 150 286 / 250 286),
    {p}-tel (celular en la mano derecha), {p}-gotas, {p}-boca, {p}-ojos, {p}-ojos-x."""
    telefono = f'''<g class="{p}-tel"><rect x="262" y="436" width="46" height="78" rx="9" fill="{D}" stroke="{C}" stroke-width="5"/>
      <rect x="270" y="448" width="30" height="50" rx="3" fill="{T}"/></g>''' if tel else ""
    return f'''<svg viewBox="0 0 400 720" aria-hidden="true"><g class="{p}-cuerpo">
  <g class="{p}-piernas">
    <path d="M180 470 L172 690 M220 470 L228 690" stroke="{D}" stroke-width="50" stroke-linecap="round" fill="none"/>
    <path d="M180 470 L172 690 M220 470 L228 690" stroke="{C}" stroke-width="37" stroke-linecap="round" fill="none"/>
    <path d="M174 600 L172 668 M226 600 L228 668" stroke="{D}" stroke-width="60" fill="none"/>
    <path d="M174 602 L172 666 M226 602 L228 666" stroke="{R}" stroke-width="48" fill="none"/>
    <path d="M150 620 H196 M150 640 H196 M204 620 H250 M204 640 H250" stroke="{D}" stroke-width="3" opacity="0.5"/>
    <ellipse cx="160" cy="698" rx="38" ry="17" fill="{C}" stroke="{D}" stroke-width="6"/>
    <ellipse cx="240" cy="698" rx="38" ry="17" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <path d="M128 452 L272 452 L268 530 L208 530 L200 500 L192 530 L132 530 Z" fill="{T}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
  <g class="{p}-bi">
    <path d="M150 286 L114 378 L108 458" stroke="{D}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M150 286 L114 378 L108 458" stroke="{C}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <circle cx="108" cy="468" r="19" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <g class="{p}-bd">
    <path d="M250 286 L286 378 L292 458" stroke="{D}" stroke-width="40" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M250 286 L286 378 L292 458" stroke="{C}" stroke-width="28" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    {telefono}
    <circle cx="292" cy="468" r="19" fill="{C}" stroke="{D}" stroke-width="6"/>
  </g>
  <path d="M146 274 Q200 258 254 274 Q306 370 272 462 Q200 486 128 462 Q94 370 146 274 Z" fill="{A}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M168 272 Q200 292 232 272" stroke="{D}" stroke-width="5" fill="none"/>
  <path d="M150 420 Q200 446 250 420" stroke="{D}" stroke-width="4" fill="none" opacity="0.4"/>
  <path d="M180 360 Q200 400 220 360" stroke="{R}" stroke-width="10" fill="none" opacity="0.5"/>
  <rect x="186" y="238" width="28" height="30" fill="{C}" stroke="{D}" stroke-width="5"/>
  <g class="{p}-cabeza">
    <circle cx="200" cy="190" r="60" fill="{C}" stroke="{D}" stroke-width="6"/>
    <path d="M142 184 Q140 150 156 140 L160 196 Z M258 184 Q260 150 244 140 L240 196 Z" fill="{V}" stroke="{D}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M142 160 Q200 124 258 160" stroke="{D}" stroke-width="26" fill="none" stroke-linecap="round"/>
    <path d="M142 160 Q200 124 258 160" stroke="{R}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <g class="{p}-ojos">
      <path d="M170 190 Q180 182 190 190 M210 190 Q220 182 230 190" stroke="{D}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M168 200 Q180 206 192 200 M208 200 Q220 206 232 200" stroke="{D}" stroke-width="3" fill="none" opacity="0.6"/>
    </g>
    <g class="{p}-ojos-x" opacity="0">
      <path d="M172 184 L188 198 M188 184 L172 198 M212 184 L228 198 M228 184 L212 198" stroke="{D}" stroke-width="6" stroke-linecap="round"/>
    </g>
    <path d="M176 218 Q200 206 224 218 Q214 226 200 222 Q186 226 176 218 Z" fill="{V}" stroke="{D}" stroke-width="4"/>
    <ellipse class="{p}-boca" cx="200" cy="236" rx="11" ry="9" fill="{D}"/>
    <path d="M144 196 Q134 200 140 212 M256 196 Q266 200 260 212" stroke="{D}" stroke-width="5" fill="none"/>
    <g class="{p}-gotas">
      <path d="M262 150 C268 162 272 170 266 176 C260 180 252 172 256 162 Z" fill="{T}" stroke="{D}" stroke-width="3"/>
      <path d="M136 140 C142 152 146 160 140 166 C134 170 126 162 130 152 Z" fill="{T}" stroke="{D}" stroke-width="3"/>
      <path d="M270 200 C276 212 280 220 274 226 C268 230 260 222 264 212 Z" fill="{T}" stroke="{D}" stroke-width="3"/>
    </g>
  </g>
</g></svg>'''


def estrella(cls, x, y, r, color=A):
    k = r * 0.28
    return f'<path class="{cls}" d="M{x} {y-r} Q{x+k} {y-k} {x+r} {y} Q{x+k} {y+k} {x} {y+r} Q{x-k} {y+k} {x-r} {y} Q{x-k} {y-k} {x} {y-r} Z" fill="{color}"/>'


CSS_COMUN = """
    @font-face { font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }
    @font-face { font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }
    #root { position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }
    [data-composition-id="%ID%"] .%P%-capa { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] .%P%-esc { position: absolute; inset: 0; }
    [data-composition-id="%ID%"] svg.%P%-full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }
    [data-composition-id="%ID%"] .fig { position: absolute; width: 400px; height: 720px; filter: drop-shadow(0 0 2px rgba(255, 243, 232, 0.75)) drop-shadow(0 0 14px rgba(255, 46, 136, 0.35)); }
    [data-composition-id="%ID%"] .fig svg { width: 100%; height: 100%; overflow: visible; }
    [data-composition-id="%ID%"] .big { position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap;
      letter-spacing: -0.02em; -webkit-text-stroke: 12px #160a2a; paint-order: stroke fill; font-style: italic; }
    [data-composition-id="%ID%"] .big.r { color: #ff2e88; text-shadow: 7px 7px 0 #1de9d6, 0 0 34px rgba(255, 46, 136, 0.6); }
    [data-composition-id="%ID%"] .big.a { color: #ffe14d; text-shadow: 7px 7px 0 #ff2e88, 0 0 34px rgba(255, 225, 77, 0.5); }
    [data-composition-id="%ID%"] .big.t { color: #1de9d6; text-shadow: 7px 7px 0 #ff2e88, 0 0 34px rgba(29, 233, 214, 0.5); }
    [data-composition-id="%ID%"] .big.c { color: #fff3e8; text-shadow: 7px 7px 0 #ff2e88; }
    [data-composition-id="%ID%"] .big.v { color: #5ce611; text-shadow: 6px 6px 0 #160a2a, 0 0 30px rgba(92, 230, 17, 0.5); }
    [data-composition-id="%ID%"] .mono { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 600; letter-spacing: 0.08em; white-space: nowrap; }
"""

JS_COMUN = """
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({ paused: true });
      const BEAT = 60 / 128;
      // golpe: texto gigante que cae en su palabra
      const golpe = (el, t, rot = -4, sc = 2.6) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: sc, rotation: rot * 3 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.16, ease: "power4.in", immediateRender: false }, t - 0.12); };
      const pop = (el, t, d = 0.35) => { gsap.set(el, { opacity: 0 }); tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: d, ease: "back.out(2)", immediateRender: false }, t); };
      const fuera = (el, t, d = 0.18) => tl.to(el, { opacity: 0, scale: 0.85, duration: d, ease: "power2.in" }, t);
      const sacudon = (t, f = 1) => [[-14 * f, 8 * f], [10 * f, -6 * f], [-5 * f, 3 * f], [0, 0]].forEach(([x, y], i) => tl.to(q(".esc"), { x, y, duration: 0.04, ease: "none" }, t + i * 0.045));
      // al ritmo: cosas que rebotan con el beat entre t0 y t1
      const rebote = (el, t0, t1, vars, d = BEAT / 2) => { const n = Math.max(1, Math.floor((t1 - t0) / d) - 1); tl.to(el, Object.assign({ duration: d, yoyo: true, repeat: n % 2 ? n : n - 1, ease: "sine.inOut" }, vars), t0); };
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
