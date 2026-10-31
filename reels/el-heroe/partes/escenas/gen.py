# uso (desde reels/el-heroe): python3 partes/escenas/gen.py partes/escenas/sNN.py
#   -> escribe compositions/<id>.html y compositions/<id>.sfx.json
# Cada escena define ID, DUR, CSS (con $ = selector de la escena), HTML, JS y SFX; las piezas
# compartidas (personajes, viñetas, globos, onomatopeyas) están en comun.py.
import sys, json, os
ns = {}
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "comun.py")).read(), ns)
exec(open(sys.argv[1]).read(), ns)
ID, DUR, CSS, HTML, JS, SFX = ns["ID"], ns["DUR"], ns["CSS"], ns["HTML"], ns["JS"], ns["SFX"]
P = ID.split("-")[0]
SEL = f'[data-composition-id="{ID}"]'
css = CSS.replace("$", SEL)
T = "stroke: #111111; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round;"
base = f"""    @font-face {{ font-family: "Bangers"; font-weight: 400; font-display: block; src: url("assets/fonts/Bangers.woff2") format("woff2"); }}
    @font-face {{ font-family: "Comic Neue"; font-weight: 700; font-display: block; src: url("assets/fonts/ComicNeue-700.woff2") format("woff2"); }}
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    {SEL} .{P}-capa, {SEL} .{P}-escenario {{ position: absolute; inset: 0; }}
    {SEL} svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    {SEL} .k {{ fill: #111111; {T} }}
    {SEL} .n {{ fill: #1d2b53; {T} }}
    {SEL} .nn {{ fill: #0b1430; {T} }}
    {SEL} .y {{ fill: #ffd23f; {T} }}
    {SEL} .r {{ fill: #e63946; {T} }}
    {SEL} .a {{ fill: #2f6fe0; {T} }}
    {SEL} .c {{ fill: #4fc3ff; {T} }}
    {SEL} .p {{ fill: #fdf6e3; {T} }}
    {SEL} .l {{ fill: none; {T} }}
    {SEL} .pl {{ fill: none; stroke: #fdf6e3; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .yl {{ fill: none; stroke: #ffd23f; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .rl {{ fill: none; stroke: #e63946; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .cl {{ fill: none; stroke: #4fc3ff; stroke-width: 9; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .marco {{ fill: none; stroke: #111111; stroke-width: 10; stroke-linejoin: miter; }}
    {SEL} .ono {{ position: absolute; font-family: "Bangers", sans-serif; font-weight: 400; line-height: 0.9; white-space: nowrap; letter-spacing: 0.03em; -webkit-text-stroke: 12px #111111; paint-order: stroke fill; text-shadow: 10px 10px 0 #111111; }}
    {SEL} .caja {{ position: absolute; padding: 12px 22px 8px; background: #ffd23f; border: 6px solid #111111; box-shadow: 8px 8px 0 #111111; font-family: "Bangers", sans-serif; font-size: 50px; line-height: 1; letter-spacing: 0.04em; color: #111111; white-space: nowrap; }}
    {SEL} .globo {{ position: absolute; padding: 22px 30px 24px; background: #fdf6e3; border: 6px solid #111111; border-radius: 46px; font-family: "Comic Neue", sans-serif; font-weight: 700; color: #111111; line-height: 1.12; text-align: center; }}
    {SEL} .globo .cola {{ position: absolute; width: 70px; height: 70px; overflow: visible; }}
    {SEL} .globo b {{ color: #e63946; }}
"""
out = f"""<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <style>
{base}{css}
  </style>
  <div id="root" data-composition-id="{ID}" data-width="1080" data-height="1920" data-duration="{DUR}">
    <div id="{P}-escena" class="{P}-capa clip" data-start="0" data-duration="{DUR}" data-track-index="0">
      <div class="{P}-escenario">
{HTML}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{ID}";
      const DUR = {DUR};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => [...root.querySelectorAll(s)];
      const tl = gsap.timeline({{ paused: true }});
      const ESC = ".{P}-escenario";
      const sacudon = (t, f = 1) => [[-16, 9], [12, -7], [-6, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(ESC), {{ x: x * f, y: y * f, duration: 0.04, ease: "none" }}, t + i * 0.045));
      // golpe: entra de grande a su tamaño, seco
      const golpe = (sel, t, desde = 2.4, extra = {{}}) => {{
        gsap.set(qa(sel), {{ opacity: 0 }});
        tl.fromTo(qa(sel), {{ opacity: 0, scale: desde, ...extra }}, {{ opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }}, t - 0.1);
      }};
      const pop = (sel, t, extra = {{}}) => {{
        gsap.set(qa(sel), {{ opacity: 0 }});
        tl.fromTo(qa(sel), {{ opacity: 0, scale: 0.6, ...extra }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false, ...extra }}, t);
      }};
      const entra = (sel, t, desde = {{ x: -600 }}, d = 0.3) => {{
        gsap.set(qa(sel), {{ opacity: 0 }});
        tl.fromTo(qa(sel), {{ opacity: 1, ...desde }}, {{ opacity: 1, x: 0, y: 0, rotation: 0, duration: d, ease: "back.out(1.4)", immediateRender: false }}, t);
      }};
      const sale = (sel, t, a = {{ opacity: 0, scale: 0.8 }}, d = 0.2) => tl.to(qa(sel), {{ ...a, duration: d, ease: "power2.in" }}, t);
      const dibujar = (sel, t, d = 0.5) => qa(sel).forEach((p) => {{
        const L = p.getTotalLength();
        gsap.set(p, {{ strokeDasharray: L, strokeDashoffset: L, opacity: 0 }});
        tl.to(p, {{ opacity: 1, duration: 0.01 }}, t);
        tl.to(p, {{ strokeDashoffset: 0, duration: d, ease: "power2.inOut" }}, t);
      }});
      // vaivén suave de t a t+d
      const respira = (sel, t, d, dy = 8, per = 0.5) => tl.fromTo(qa(sel), {{ y: 0 }}, {{ y: dy, duration: per, yoyo: true, repeat: Math.max(1, Math.round(d / per) | 1), ease: "sine.inOut", immediateRender: false }}, t);
      const habla = (sel, t, d, origin) => tl.fromTo(qa(sel), {{ scaleY: 1, svgOrigin: origin }}, {{ scaleY: 2.2, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }}, t);
      // titila (onomatopeyas, ojos que brillan)
      const late = (sel, t, n = 3, s = 1.08, per = 0.14) => tl.to(qa(sel), {{ scale: s, duration: per, yoyo: true, repeat: n * 2 - 1, ease: "sine.inOut" }}, t);
      // zoom lento de cámara sobre la viñeta
      const camara = (sel, t, d, desde, hasta, origen = "50% 50%") => tl.fromTo(qa(sel), {{ scale: desde, transformOrigin: origen }}, {{ scale: hasta, transformOrigin: origen, duration: d, ease: "none", immediateRender: false }}, t);
{JS}
      tl.to(q("#{P}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power3.in" }}, DUR - 0.2);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
"""
open(f"compositions/{ID}.html", "w").write(out)
open(f"compositions/{ID}.sfx.json", "w").write(json.dumps(SFX, indent=1))
print("ok", ID)
