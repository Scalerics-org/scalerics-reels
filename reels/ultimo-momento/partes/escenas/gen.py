# uso: python3 gen.py <archivo_escena.py>  -> escribe compositions/<id>.html y .sfx.json
import sys, json, re
ns = {}
exec(open(sys.argv[1]).read(), ns)
ID, DUR, CSS, HTML, JS, SFX = ns["ID"], ns["DUR"], ns["CSS"], ns["HTML"], ns["JS"], ns["SFX"]
P = ID.split("-")[0]
SEL = f'[data-composition-id="{ID}"]'
css = CSS.replace("$", SEL)
base = f"""    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    {SEL} .{P}-capa, {SEL} .{P}-escenario {{ position: absolute; inset: 0; }}
    {SEL} svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    {SEL} .b {{ fill: #0b1d4a; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .l {{ fill: none; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .r {{ fill: #e3212d; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .m {{ fill: #1f4fa8; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .y {{ fill: #ffd21f; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .g {{ fill: #0b1d4a; stroke: #5ce611; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .gl {{ fill: none; stroke: #5ce611; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .w {{ fill: #f4f6fb; stroke: #f4f6fb; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }}
    {SEL} .txt {{ position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 1; white-space: nowrap; letter-spacing: -0.02em; }}
    {SEL} .cartela {{ position: absolute; padding: 12px 26px 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; line-height: 1; text-transform: uppercase; white-space: nowrap; }}
    {SEL} .mono {{ font-family: "IBM Plex Mono", monospace; font-weight: 500; }}
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
      const golpe = (sel, t, desde = 2.4) => {{
        gsap.set(q(sel), {{ opacity: 0 }});
        tl.fromTo(q(sel), {{ opacity: 0, scale: desde }}, {{ opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }}, t - 0.1);
      }};
      const pop = (sel, t, extra = {{}}) => {{
        gsap.set(q(sel), {{ opacity: 0 }});
        tl.fromTo(q(sel), {{ opacity: 0, scale: 0.7, ...extra }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false, ...extra }}, t);
      }};
      const entra = (sel, t, desde = {{ x: -600 }}) => {{
        gsap.set(q(sel), {{ opacity: 0 }});
        tl.fromTo(q(sel), {{ opacity: 1, ...desde }}, {{ opacity: 1, x: 0, y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }}, t);
      }};
      const dibujar = (sel, t, d = 0.5) => qa(sel).forEach((p) => {{
        const L = p.getTotalLength();
        gsap.set(p, {{ strokeDasharray: L, strokeDashoffset: L, opacity: 0 }});
        tl.to(p, {{ opacity: 1, duration: 0.01 }}, t);
        tl.to(p, {{ strokeDashoffset: 0, duration: d, ease: "power2.inOut" }}, t);
      }});
      const habla = (sel, t, d, origin) => tl.fromTo(q(sel), {{ scaleY: 1, svgOrigin: origin }}, {{ scaleY: 2.4, svgOrigin: origin, duration: 0.11, yoyo: true, repeat: Math.max(1, Math.round(d / 0.11)) | 1, ease: "sine.inOut", immediateRender: false }}, t);
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
