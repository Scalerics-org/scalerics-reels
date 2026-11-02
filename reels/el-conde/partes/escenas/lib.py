import json, os
DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "compositions")  # generador de s02-s14: python3 partes/escenas/s05.py

def conde(p, x, y, s, extra="", boca="seria", flip=False):
    sx = -s if flip else s
    bocas = {
        "seria": '<path class="linea" d="M-18 -362 Q0 -352 18 -362" /><path fill="#ffffff" stroke="#12061f" stroke-width="2.5" stroke-linejoin="round" d="M-12 -359 l4 11 l4 -10 Z M4 -358 l4 10 l4 -11 Z" />',
        "grito": f'<path class="tinta {p}-boca" fill="#5a0c1c" d="M-20 -368 Q0 -380 20 -368 Q22 -340 0 -336 Q-22 -340 -20 -368 Z" /><path fill="#ffffff" stroke="#12061f" stroke-width="2.5" stroke-linejoin="round" d="M-13 -370 l4 12 l4 -11 Z M5 -371 l4 11 l4 -12 Z" />',
        "sonrisa": '<path class="tinta" fill="#5a0c1c" d="M-24 -366 Q0 -340 24 -366 Q0 -356 -24 -366 Z" /><path fill="#ffffff" stroke="#12061f" stroke-width="2.5" stroke-linejoin="round" d="M-14 -363 l4 12 l4 -10 Z M6 -362 l4 10 l4 -12 Z" />',
    }
    return f'''<g transform="translate({x} {y}) scale({sx} {s})"><g class="{p}-conde">
  <g class="{p}-cuerpo">
    <path class="tinta" fill="#c8102e" d="M-160 0 L-112 -330 L112 -330 L160 0 Z" />
    <path class="tinta" fill="#160a24" d="M-160 0 L-112 -330 L-62 -330 L-78 0 Z" />
    <path class="tinta" fill="#160a24" d="M160 0 L112 -330 L62 -330 L78 0 Z" />
    <path class="tinta" fill="#2a1546" d="M-62 0 L-56 -330 L56 -330 L62 0 Z" />
    <path class="tinta" fill="#f4ead5" d="M-24 -330 L0 -246 L24 -330 Z" />
    <circle class="tinta" fill="#ffd23f" cx="0" cy="-232" r="13" />
    <path class="tinta" fill="#c8102e" d="M-58 -330 L-128 -452 L-40 -386 Z" />
    <path class="tinta" fill="#c8102e" d="M58 -330 L128 -452 L40 -386 Z" />
  </g>
  <g class="{p}-cabeza">
    <path class="tinta" fill="#dfe8c8" d="M-56 -414 L-70 -440 L-48 -426 Z M56 -414 L70 -440 L48 -426 Z" />
    <path class="tinta" fill="#dfe8c8" d="M-50 -405 C-52 -478 52 -478 50 -405 C48 -356 22 -334 0 -332 C-22 -334 -48 -356 -50 -405 Z" />
    <path class="tinta" fill="#160a24" d="M-52 -410 C-58 -492 58 -492 52 -410 C44 -446 22 -450 0 -414 C-22 -450 -44 -446 -52 -410 Z" />
    <path class="{p}-cejas linea" d="M-36 -414 L-12 -402 M36 -414 L12 -402" />
    <circle class="{p}-ojo" fill="#c8102e" cx="-21" cy="-392" r="6.5" />
    <circle class="{p}-ojo" fill="#c8102e" cx="21" cy="-392" r="6.5" />
    {bocas[boca]}
  </g>
  {extra}
</g></g>'''

def igor(p, x, y, s, extra="", flip=False):
    sx = -s if flip else s
    return f'''<g transform="translate({x} {y}) scale({sx} {s})"><g class="{p}-igor">
  <path class="tinta" fill="#3b2a1a" d="M-62 0 h50 v-16 h-50Z M18 0 h50 v-16 h-50Z" />
  <path class="tinta" fill="#7a4e2d" d="M-70 -14 L-84 -150 C-96 -260 24 -300 74 -222 C92 -184 84 -100 72 -14 Z" />
  <path class="linea" d="M-80 -92 L76 -84" />
  <path class="linea" d="M-20 -230 q20 30 4 70" opacity="0.6" />
  <g class="{p}-igor-cabeza">
    <circle class="tinta" fill="#c9b98a" cx="76" cy="-232" r="48" />
    <path class="tinta" fill="#3b2a1a" d="M32 -252 C34 -304 114 -304 120 -252 L108 -264 L98 -246 L86 -268 L74 -250 L62 -270 L50 -252 L40 -266 Z" />
    <circle fill="#ffffff" stroke="#12061f" stroke-width="4" cx="92" cy="-230" r="15" />
    <circle class="{p}-igor-ojo" fill="#12061f" cx="96" cy="-230" r="6" />
    <circle fill="#12061f" cx="60" cy="-234" r="5" />
    <path class="linea" d="M64 -202 q16 8 32 -4" />
    <path fill="#ffffff" stroke="#12061f" stroke-width="2" d="M78 -200 v8 h6 v-9 Z" />
  </g>
  {extra}
</g></g>'''

BASE_CSS = '''
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    @font-face {{ font-family: "Cinzel"; font-weight: 400 900; font-display: block; src: url("assets/fonts/Cinzel-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="{id}"] .{p}-capa {{ position: absolute; inset: 0; }}
    [data-composition-id="{id}"] .{p}-escenario {{ position: absolute; inset: 0; }}
    [data-composition-id="{id}"] svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    [data-composition-id="{id}"] .tinta {{ stroke: #12061f; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }}
    [data-composition-id="{id}"] .linea {{ fill: none; stroke: #12061f; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }}
    [data-composition-id="{id}"] .crema {{ fill: none; stroke: #f4ead5; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }}
    [data-composition-id="{id}"] .afiche {{ position: absolute; left: 0; right: 0; text-align: center; font-family: "Cinzel", serif; font-weight: 900; line-height: 1; white-space: nowrap; color: #ffd23f; -webkit-text-stroke: 10px #12061f; paint-order: stroke fill; text-shadow: 9px 9px 0 #c8102e; }}
    [data-composition-id="{id}"] .etiqueta {{ position: absolute; left: 0; right: 0; top: 1268px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.34em; color: #b6ff3b; text-transform: uppercase; white-space: nowrap; }}
    [data-composition-id="{id}"] .sello {{ position: absolute; text-align: center; font-family: "Cinzel", serif; font-weight: 900; line-height: 1; white-space: nowrap; color: #c8102e; border: 10px solid #c8102e; border-radius: 20px; background: rgba(18, 6, 31, 0.9); }}
'''

BASE_JS = '''
      const ID = "{id}";
      const DUR = {dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({{ paused: true }});
      const pop = (el, t, from = 0.6) => {{
        gsap.set(el, {{ opacity: 0 }});
        tl.fromTo(el, {{ opacity: 0, scale: from }}, {{ opacity: 1, scale: 1, duration: 0.32, ease: "back.out(1.8)", immediateRender: false }}, t);
      }};
      const slam = (el, t) => {{
        gsap.set(el, {{ opacity: 0 }});
        tl.fromTo(el, {{ opacity: 0, scale: 2.4 }}, {{ opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }}, t - 0.1);
      }};
      const golpe = (t, f = 14) => {{
        [[-f, f * 0.6], [f * 0.8, -f * 0.5], [-f * 0.4, f * 0.2], [0, 0]].forEach(([x, y], i) => tl.to(q(".{p}-escenario"), {{ x, y, duration: 0.04, ease: "none" }}, t + i * 0.045));
      }};
      const dibujar = (el, t, d = 0.6) => {{
        const L = el.getTotalLength ? el.getTotalLength() : 1000;
        gsap.set(el, {{ strokeDasharray: L, strokeDashoffset: L, opacity: 0 }});
        tl.set(el, {{ opacity: 1 }}, t);
        tl.to(el, {{ strokeDashoffset: 0, duration: d, ease: "power2.inOut" }}, t);
      }};
      const sale = (el, t) => tl.to(el, {{ opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.in" }}, t);
      // etiquetas: varios .etiqueta; muestra(el, t) apaga la que estaba y prende esta
      let etActual = null;
      const muestra = (el, t) => {{
        if (etActual) tl.to(etActual, {{ opacity: 0, y: -10, duration: 0.12 }}, t - 0.12);
        gsap.set(el, {{ opacity: 0 }});
        tl.fromTo(el, {{ opacity: 0, y: 12 }}, {{ opacity: 1, y: 0, duration: 0.22, ease: "power2.out", immediateRender: false }}, t);
        etActual = el;
      }};
'''

def escena(id, dur, css, html, js, sfx, etiqueta=None):
    p = id.split("-")[0]
    full_css = BASE_CSS.format(id=id, p=p) + css.replace("$S", f'[data-composition-id="{id}"]')
    et = "".join(f'\n        <div class="etiqueta {p}-e{i+1}">{t}</div>' for i, t in enumerate(etiqueta or []))
    out = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>{full_css}  </style>
  <div id="root" data-composition-id="{id}" data-width="1080" data-height="1920" data-duration="{dur}">
    <div id="{p}-escena" class="{p}-capa clip" data-start="0" data-duration="{dur}" data-track-index="0">
      <div class="{p}-escenario">
{html}{et}
      </div>
    </div>
  </div>
  <script>
    (function () {{{BASE_JS.format(id=id, dur=dur, p=p)}
{js}
      tl.to(q("#{p}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.25, ease: "power2.in" }}, DUR - 0.25);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
    open(os.path.join(DIR, id + ".html"), "w").write(out)
    open(os.path.join(DIR, id + ".sfx.json"), "w").write(json.dumps(sfx, indent=1) + "\n")
