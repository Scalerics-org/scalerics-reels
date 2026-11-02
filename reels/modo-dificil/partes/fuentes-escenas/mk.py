#!/usr/bin/env python3
# uso: mk.py <dir-proyecto> <archivo-fuente>
# fuente: primera línea "id dur", luego secciones ===CSS===, ===HTML===, ===JS===, ===SFX===
# En el texto: "P " = selector de la composición, "X-" = prefijo de la escena.
import sys, re, os
proj, src = sys.argv[1], sys.argv[2]
txt = open(src).read()
head, rest = txt.split("\n", 1)
ID, DUR = head.split()
pre = ID.split("-")[0]
parts = dict(re.findall(r"===(\w+)===\n(.*?)(?=\n===\w+===|\Z)", rest, re.S))
P = f'[data-composition-id="{ID}"]'
def sub(s):
    s = s.replace("P .", P + " .").replace("P svg", P + " svg")
    return re.sub(r"\bX-", pre + "-", s)
css = sub(parts.get("CSS", ""))
html = sub(parts.get("HTML", ""))
js = sub(parts.get("JS", ""))
out = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/juego.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    {P} .{pre}-capa {{ position: absolute; inset: 0; }}
    {P} .{pre}-escenario {{ position: absolute; inset: 0; }}
    {P} svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    {P} .{pre}-txt {{ position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; line-height: 1; white-space: nowrap; text-transform: uppercase; }}
    {P} .{pre}-big {{ font-weight: 900; color: #fbf3dc; text-shadow: 0 7px 0 #0f1826; }}
    {P} .{pre}-sello b {{ display: inline-block; transform: rotate(-5deg); padding: 10px 26px; background: #ef5b5b; border: 6px solid #0f1826; border-radius: 18px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #fbf3dc; box-shadow: 0 8px 0 #0f1826; }}
    {P} .{pre}-sello small {{ display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; margin-bottom: 4px; color: #0f1826; }}
    {P} .{pre}-pill b {{ display: inline-block; padding: 10px 24px; background: #0f1826; border: 4px solid #fbf3dc; border-radius: 40px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 36px; color: #fbf3dc; }}
{css}
  </style>
  <div id="root" data-composition-id="{ID}" data-width="1080" data-height="1920" data-duration="{DUR}">
    <div id="{pre}-escena" class="{pre}-capa clip" data-start="0" data-duration="{DUR}" data-track-index="0">
      <div class="{pre}-escenario">
{html}
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
      const pop = (el, t, d = 0.35) => {{ gsap.set(el, {{ opacity: 0 }}); tl.fromTo(el, {{ opacity: 0, scale: 0.85 }}, {{ opacity: 1, scale: 1, duration: d, ease: "back.out(1.6)", immediateRender: false }}, t); }};
      const golpe = (el, t) => {{ gsap.set(el, {{ opacity: 0 }}); tl.fromTo(el, {{ opacity: 0, scale: 2.2 }}, {{ opacity: 1, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }}, t - 0.1); }};
      const sale = (el, t, d = 0.2) => tl.to(el, {{ opacity: 0, duration: d }}, t);
      const sacudon = (t, f = 1) => [[-12, 7], [10, -5], [-4, 3], [0, 0]].forEach(([x, y], i) => tl.to(q(".{pre}-escenario"), {{ x: x * f, y: y * f, duration: 0.04, ease: "none" }}, t + i * 0.045));
      const dibujar = (el, t, d = 0.6) => {{ const L = el.getTotalLength(); gsap.set(el, {{ strokeDasharray: L, strokeDashoffset: L, opacity: 0 }}); tl.set(el, {{ opacity: 1 }}, t); tl.to(el, {{ strokeDashoffset: 0, duration: d, ease: "power2.inOut" }}, t); }};
      const ojos = (h, cual, t) => ["a", "m", "c"].forEach((k) => tl.to(q(h + " .h-ojo-" + k), {{ opacity: k === cual ? 1 : 0, duration: 0.05 }}, t));
      const diamRojo = (h, t) => {{ tl.to(q(h + " .h-diam-r"), {{ opacity: 1, duration: 0.15 }}, t); }};
      const diamGira = (h, t0 = 0) => {{ tl.fromTo(q(h + " .h-diam"), {{ scaleX: 1 }}, {{ scaleX: -1, duration: 0.7, yoyo: true, repeat: Math.max(1, Math.floor((DUR - t0) / 0.7)), ease: "sine.inOut", svgOrigin: "0 0" }}, t0); tl.fromTo(q(h + " .h-diam-r"), {{ scaleX: 1 }}, {{ scaleX: -1, duration: 0.7, yoyo: true, repeat: Math.max(1, Math.floor((DUR - t0) / 0.7)), ease: "sine.inOut", svgOrigin: "0 0" }}, t0); tl.fromTo(q(h + " .h-diam-g"), {{ y: 0 }}, {{ y: -14, duration: 0.8, yoyo: true, repeat: Math.max(1, Math.floor((DUR - t0) / 0.8)), ease: "sine.inOut" }}, t0); }};
{js}
      tl.to(q("#{pre}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }}, DUR - 0.2);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
open(os.path.join(proj, "compositions", ID + ".html"), "w").write(out)
if "SFX" in parts:
    open(os.path.join(proj, "compositions", ID + ".sfx.json"), "w").write(parts["SFX"].strip() + "\n")
print("ok", ID)
