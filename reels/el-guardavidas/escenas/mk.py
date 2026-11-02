import json, sys, os
def mk(id, dur, css, html, js, sfx):
    n = id.split('-')[0]
    c = '\n'.join('    [data-composition-id="%s"] %s' % (id, l.strip()) for l in css.strip().split('\n') if l.strip())
    out = f'''<template>
  <script src="assets/vendor/gsap.min.js"></script>
  <script src="assets/playa.js"></script>
  <style>
    @font-face {{ font-family: "Lexend"; font-weight: 100 900; font-display: block; src: url("assets/fonts/Lexend-var.woff2") format("woff2"); }}
    @font-face {{ font-family: "IBM Plex Mono"; font-weight: 600; font-display: block; src: url("assets/fonts/IBMPlexMono-600.woff2") format("woff2"); }}
    @font-face {{ font-family: "Black Ops One"; font-weight: 400; font-display: block; src: url("assets/fonts/BlackOpsOne.woff2") format("woff2"); }}
    @font-face {{ font-family: "Caveat"; font-weight: 400 700; font-display: block; src: url("assets/fonts/Caveat-var.woff2") format("woff2"); }}
    #root {{ position: absolute; inset: 0; width: 1080px; height: 1920px; overflow: hidden; pointer-events: none; }}
    [data-composition-id="{id}"] .{n}-capa, [data-composition-id="{id}"] .{n}-escenario {{ position: absolute; inset: 0; }}
    [data-composition-id="{id}"] svg {{ position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: visible; }}
{c}
  </style>
  <div id="root" data-composition-id="{id}" data-width="1080" data-height="1920" data-duration="{dur}">
    <div id="{n}-escena" class="{n}-capa clip" data-start="0" data-duration="{dur}" data-track-index="0">
      <div class="{n}-escenario">
        <svg class="{n}-svg" viewBox="0 0 1080 1920" aria-hidden="true"></svg>
{html}
      </div>
    </div>
  </div>
  <script>
    (function () {{
      const ID = "{id}";
      const DUR = {dur};
      const root = document.querySelector('[data-composition-id="' + ID + '"]');
      const svg = root.querySelector(".{n}-svg");
      const tl = gsap.timeline({{ paused: true }});
{js}
      K.salida(q("#{n}-escena"), DUR);
      window.__timelines = window.__timelines || {{}};
      window.__timelines[ID] = tl;
    }})();
  </script>
</template>
'''
    open(f'compositions/{id}.html', 'w').write(out)
    open(f'compositions/{id}.sfx.json', 'w').write(json.dumps(sfx))
