from lib import *
p="s03"
perg = f'''<g class="{p}-perg">
    <path class="tinta" fill="#f4ead5" d="M104 -196 h70 v150 h-70 Z" />
    <path class="tinta" fill="#e3d3ad" d="M98 -204 h82 v14 h-82 Z M98 -52 h82 v14 h-82 Z" />
    <path class="linea" stroke-width="3" d="M114 -170 h50 M114 -150 h40 M114 -130 h50 M114 -110 h34 M114 -90 h46" />
    <circle class="tinta" fill="#c9b98a" cx="110" cy="-120" r="13" />
  </g>'''
tienda = f'''<g class="{p}-tienda">
    <path class="tinta" fill="#2a1546" d="M520 1240 V820 H1010 V1240 Z" />
    <rect class="tinta" fill="#f4ead5" x="560" y="740" width="410" height="78" rx="10" />
    <text x="765" y="793" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="40" fill="#12061f">TIENDA · CENTRO</text>
    <g class="{p}-toldo">
      <path class="tinta" fill="#c8102e" d="M500 830 h530 l-20 70 H520 Z" />
      <path fill="#f4ead5" d="M560 832 h50 l-4 66 h-50 Z M670 832 h50 l-2 66 h-50 Z M780 832 h50 v66 h-50 Z M890 832 h50 l2 66 h-50 Z" />
      <path class="linea" d="M500 830 h530 l-20 70 H520 Z" />
      <path class="tinta" fill="#c8102e" d="M520 900 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 54 0 q27 30 46 0 Z" />
    </g>
    <rect class="tinta" fill="#ffd9a0" x="560" y="950" width="410" height="250" rx="6" />
    <g class="{p}-maniqui">
      <path class="tinta" fill="#7a4e2d" d="M760 1200 v-30 h10 v30 Z M730 1200 h70 v-8 h-70 Z" />
      <g class="{p}-capa-nueva">
        <path class="{p}-forro tinta" fill="#c8102e" d="M700 1168 L734 1000 L796 1000 L830 1168 Z" />
        <path class="{p}-izq tinta" fill="#160a24" d="M700 1168 L734 1000 L765 1000 L765 1168 Z" />
        <path class="{p}-der tinta" fill="#160a24" d="M830 1168 L796 1000 L765 1000 L765 1168 Z" />
        <path class="tinta" fill="#c8102e" d="M736 1002 L714 960 L756 990 Z M794 1002 L816 960 L774 990 Z" />
      </g>
      <circle class="tinta" fill="#e3d3ad" cx="765" cy="978" r="22" />
    </g>
    <text class="{p}-precio" x="900" y="1150" text-anchor="middle" font-family="Caveat" font-weight="700" font-size="42" fill="#c8102e" transform="rotate(-8 900 1150)">lana!</text>
  </g>
  <g class="{p}-brillos">
    <path fill="#ffd23f" d="M680 1000 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 Z" />
    <path fill="#ffd23f" d="M860 1060 l5 -13 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 Z" />
    <path fill="#ffd23f" d="M840 960 l4 -10 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 Z" />
  </g>'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {tienda}
          {igor(p, 230, 1240, 1.3, perg)}
        </svg>'''
js = f'''
      const TIENDA = 0.8, CAPAS = 2.09, LANA = 2.4, ROJO = 3.52;
      tl.fromTo(q(".{p}-igor"), {{ x: -160, opacity: 0.4 }}, {{ x: 0, opacity: 1, duration: 0.35, ease: "power3.out" }}, 0);
      tl.fromTo(q(".{p}-perg"), {{ scaleY: 0.2 }}, {{ scaleY: 1, svgOrigin: "140 -196", duration: 0.4, ease: "back.out(2)" }}, 0.1);
      tl.to(q(".{p}-igor-cabeza"), {{ rotation: 4, svgOrigin: "60 -190", duration: 0.25, yoyo: true, repeat: 9, ease: "sine.inOut" }}, 0.3);
      // la tienda aparece en "tienda"
      gsap.set(q(".{p}-tienda"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-tienda"), {{ opacity: 0, y: 60 }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)", immediateRender: false }}, TIENDA - 0.1);
      tl.fromTo(q(".{p}-toldo"), {{ scaleY: 0 }}, {{ scaleY: 1, svgOrigin: "765 830", duration: 0.35, ease: "back.out(2)", immediateRender: false }}, TIENDA + 0.15);
      muestra(q(".{p}-e1"), 1.2);
      // capas de lana: el maniquí con la capa
      pop(q(".{p}-maniqui"), CAPAS - 0.05, 0.4);
      pop(q(".{p}-precio"), LANA, 0.4);
      // forradas en rojo: se abre
      tl.to(q(".{p}-izq"), {{ scaleX: 0.25, svgOrigin: "702 1100", duration: 0.3, ease: "back.out(2)" }}, ROJO - 0.3);
      tl.to(q(".{p}-der"), {{ scaleX: 0.25, svgOrigin: "828 1100", duration: 0.3, ease: "back.out(2)" }}, ROJO - 0.3);
      qa(".{p}-brillos path").forEach((b, i) => {{
        gsap.set(b, {{ opacity: 0 }});
        tl.fromTo(b, {{ opacity: 0, scale: 0, transformOrigin: "50% 50%" }}, {{ opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.25, ease: "back.out(3)", immediateRender: false }}, ROJO + i * 0.1);
        tl.to(b, {{ rotation: 90, transformOrigin: "50% 50%", duration: 0.8, ease: "none" }}, ROJO + 0.25 + i * 0.1);
      }});
      muestra(q(".{p}-e2"), ROJO);
'''
sfx=[{"t":0.05,"sfx":"whoosh","vol":0.22},{"t":0.75,"sfx":"pop","vol":0.3},{"t":1.0,"sfx":"campanita","vol":0.3},{"t":2.05,"sfx":"pop","vol":0.3},{"t":3.3,"sfx":"whoosh-short","vol":0.25},{"t":3.5,"sfx":"sparkle","vol":0.35}]
escena("s03-tienda", 5.10, "", html, js, sfx, ["tienda del centro", "forrada en rojo"])
