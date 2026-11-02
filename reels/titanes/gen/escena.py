# (Copiado de reels/el-enlatado/gen, con la clase .cartel de póster de lucha.) Arma el esqueleto de una escena (template, fuentes, kit, contenedor, salida) a partir de un
# pedazo de CSS, HTML y JS. Uso desde gen/*.py: escena("s02-rincones", 7.39, css, html, js).
# En el CSS, "S " se reemplaza por el selector de la composición. En el JS hay q(), qa(), K y tl.
import json

def escena(id, dur, css, html, js, sfx=None, salida="blur"):
    S = f'[data-composition-id="{id}"] '
    css = "\n".join("    " + (S + l[2:] if l.startswith("S ") else l) for l in css.strip().splitlines())
    out = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/kit.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 500; font-display: block; src: url("assets/fonts/IBMPlexMono-500.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    {S}.esc-capa {{ position: absolute; inset: 0; }}
    {S}.esc-escenario {{ position: absolute; inset: 0; }}
    {S}svg.esc-svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
    {S}.txt {{ position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; line-height: 1; white-space: nowrap; font-weight: 900; letter-spacing: -0.01em; }}
    {S}.mono {{ font-family: "IBM Plex Mono", monospace; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; white-space: nowrap; }}
    {S}.cartel {{ position: absolute; left: 0; right: 0; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.95; white-space: nowrap; letter-spacing: -0.01em; color: #ffd23f; -webkit-text-stroke: 8px #0b0b12; paint-order: stroke fill; text-shadow: 10px 10px 0 #e8332a; }}
    {S}.cartel.rojo {{ color: #e8332a; text-shadow: 10px 10px 0 #0b0b12; }}
    {S}.cartel.azul {{ color: #f4efe2; text-shadow: 10px 10px 0 #2a5cff; }}
    {S}.cartel.verde {{ color: #5ce611; text-shadow: 10px 10px 0 #0b0b12; }}
    {S}.sello {{ position: absolute; padding: 8px 24px; border: 7px solid currentColor; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 1; white-space: nowrap; text-transform: uppercase; }}
{css}
  </style>
  <div id="root" data-composition-id="{id}" data-width="1080" data-height="1920" data-duration="{dur}">
    <div id="{id}-escena" class="esc-capa clip" data-start="0" data-duration="{dur}" data-track-index="0">
      <div class="esc-escenario">
{html}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{id}";
      const DUR = {dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const q = (s) => root.querySelector(s);
      const qa = (s) => root.querySelectorAll(s);
      const K = window.KIT;
      const esc = q(".esc-escenario");
      const tl = gsap.timeline({{ paused: true }});
{js}
      // salida
      tl.to(q("#{id}-escena"), {{ opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power2.in" }}, DUR - 0.2);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
    open(f"compositions/{id}.html", "w").write(out)
    if sfx is not None:
        open(f"compositions/{id}.sfx.json", "w").write(json.dumps([dict(t=t, sfx=n, vol=v, **({"max": m} if m else {})) for t, n, v, *mm in sfx for m in [mm[0] if mm else None]], ensure_ascii=False, indent=0))
