import json, re
OUT = __import__("os").path.join(__import__("os").path.dirname(__file__), "../../compositions/")
def dur_de(id):
    t = open(__import__("os").path.join(__import__("os").path.dirname(__file__), "../../tiempos.md")).read()
    return float(re.search(r"### " + id + r" — dura ([\d.]+)", t).group(1))
def escena(id, css, cuerpo, js, sfx, html=""):
    D = dur_de(id)
    P = id.split("-")[0]
    # la escena del CTA queda quieta hasta el final (sin salida con blur)
    SALIDA = "      tl.to({}, { duration: 0.01 }, DUR - 0.01);" if id.endswith("-cta") else '      // salida\n      tl.to(q("#' + P + '-escena"), { opacity: 0, filter: "blur(6px)", duration: 0.3, ease: "power2.in" }, DUR - 0.3);'
    css = css.replace("SC", f'[data-composition-id="{id}"]')
    s = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "Cormorant"; font-style: italic; font-weight: 500; font-display: block; src: url("assets/fonts/CormorantGaramond-Italic-500.woff2") format("woff2"); }}
    @font-face {{ font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="{id}"] .capa {{ position: absolute; inset: 0; }}
    [data-composition-id="{id}"] .escenario {{ position: absolute; inset: 0; }}
    [data-composition-id="{id}"] svg.lienzo {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    [data-composition-id="{id}"] .linea {{ fill: none; stroke: #4b2537; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round; }}
    [data-composition-id="{id}"] .cartel {{ position: absolute; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; color: #4b2537; white-space: nowrap; text-align: center; }}
    [data-composition-id="{id}"] .mano {{ position: absolute; font-family: "Caveat", cursive; font-weight: 700; color: #4b2537; white-space: nowrap; text-align: center; }}
    [data-composition-id="{id}"] .mono {{ position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.16em; color: #4b2537; white-space: nowrap; text-align: center; }}
    [data-composition-id="{id}"] .lex {{ position: absolute; font-family: "Lexend", sans-serif; font-weight: 700; color: #4b2537; white-space: nowrap; text-align: center; }}
    [data-composition-id="{id}"] .sello {{ position: absolute; padding: 6px 22px; border: 6px solid #c4607a; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 800; color: #c4607a; letter-spacing: 0.06em; white-space: nowrap; text-transform: uppercase; background: rgba(251, 239, 233, 0.92); }}
{css}
  </style>
  <div id="root" data-composition-id="{id}" data-width="1080" data-height="1920" data-duration="{D}">
    <div id="{P}-escena" class="capa clip" data-start="0" data-duration="{D}" data-track-index="0">
      <div class="escenario">
        <svg class="lienzo" viewBox="0 0 1080 1920" aria-hidden="true">
{cuerpo}
        </svg>
{html}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{id}";
      const DUR = {D};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({{ paused: true }});
      const dibujar = (els, t, dur, desde) => {{
        els.forEach((el, i) => {{
          const L = el.getTotalLength();
          gsap.set(el, {{ strokeDasharray: L, strokeDashoffset: L }});
          gsap.set(el, {{ opacity: 0 }});
          tl.to(el, {{ opacity: 1, duration: 0.04 }}, Math.max(0, t + i * 0.04));
          tl.fromTo(el, {{ strokeDashoffset: L * (desde ?? 1) }}, {{ strokeDashoffset: 0, duration: dur, ease: "power2.inOut" }}, t + i * 0.04);
        }});
      }};
      const pop = (el, t, d) => {{
        gsap.set(el, {{ opacity: 0 }});
        tl.fromTo(el, {{ opacity: 0, scale: 0.85 }}, {{ opacity: 1, scale: 1, duration: d ?? 0.35, ease: "back.out(1.6)", immediateRender: false }}, t);
      }};
      const popSvg = (el, t, origen, d) => {{
        gsap.set(el, {{ opacity: 0 }});
        tl.fromTo(el, {{ opacity: 0, scale: 0.6, svgOrigin: origen }}, {{ opacity: 1, scale: 1, svgOrigin: origen, duration: d ?? 0.35, ease: "back.out(2)", immediateRender: false }}, t);
      }};
      const sello = (el, t, rot) => {{
        gsap.set(el, {{ opacity: 0, rotation: rot ?? -8 }});
        tl.fromTo(el, {{ opacity: 0, scale: 2.2 }}, {{ opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }}, t - 0.1);
      }};
      const temblor = (el, t, f) => [[-12, 7], [10, -6], [-5, 3], [0, 0]].forEach(([x, y], i) => tl.to(el, {{ x: x * (f ?? 1), y: y * (f ?? 1), duration: 0.04, ease: "none" }}, t + i * 0.045));
      // zoom dramático de telenovela de la tarde
      const zoom = (t, s, ox, oy, d) => tl.to(q(".escenario"), {{ scale: s, transformOrigin: ox + "px " + oy + "px", duration: d ?? 0.35, ease: "power3.out" }}, t);
{js}
{SALIDA}
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
    open(OUT + id + ".html", "w").write(s)
    open(OUT + id + ".sfx.json", "w").write(json.dumps(sfx))
    print("ok", id, D)
