from lib import *
p="s04"
manos = f'''<g class="{p}-manos">
    <circle class="tinta {p}-mi" fill="#dfe8c8" cx="-14" cy="-196" r="17" />
    <circle class="tinta {p}-md" fill="#dfe8c8" cx="14" cy="-190" r="17" />
  </g>
  <text class="{p}-preg" x="90" y="-470" font-family="Cinzel" font-weight="900" font-size="110" fill="#ffd23f" stroke="#12061f" stroke-width="8" paint-order="stroke">?</text>'''
puerta = f'''<g class="{p}-puerta">
    <path class="tinta" fill="#7a4e2d" d="M620 1240 V820 q160 -110 320 0 V1240 Z" />
    <path class="linea" d="M700 1240 V840 M780 1240 V790 M860 1240 V840" opacity="0.6" />
    <circle class="tinta" fill="#ffd23f" cx="900" cy="1060" r="12" />
    <path class="linea" stroke="#f4ead5" style="stroke:#f4ead5" d="M700 820 L740 880 M860 820 L820 880" />
    <circle class="tinta" fill="#ffd23f" cx="780" cy="800" r="10" />
    <g class="{p}-cartel">
      <rect class="tinta" fill="#f4ead5" x="650" y="880" width="260" height="210" rx="12" />
      <text x="780" y="925" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="26" letter-spacing="6" fill="#12061f">HORARIO</text>
      <path class="linea" stroke-width="3" d="M680 942 h200" />
      <text class="{p}-nueve" x="780" y="1040" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="76" fill="#c8102e">9<tspan class="{p}-a" font-family="Lexend" font-weight="600" font-size="44" fill="#12061f"> a </tspan><tspan class="{p}-diecinueve">19</tspan></text>
    </g>
  </g>'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {puerta}
          {conde(p, 300, 1240, 1.05, manos, boca="sonrisa")}
        </svg>'''
js = f'''
      const ABREN = 0.81, NUEVE = 2.02, SIETE = 2.58;
      tl.fromTo(q(".{p}-conde"), {{ opacity: 0.5, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.6)" }}, 0);
      tl.fromTo(q(".{p}-puerta"), {{ opacity: 0.4, x: 120 }}, {{ opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }}, 0);
      // se frota las manos
      tl.to(q(".{p}-mi"), {{ x: 14, y: -6, duration: 0.1, yoyo: true, repeat: 13, ease: "sine.inOut" }}, 0.05);
      tl.to(q(".{p}-md"), {{ x: -14, y: 6, duration: 0.1, yoyo: true, repeat: 13, ease: "sine.inOut" }}, 0.05);
      tl.to(q(".{p}-cuerpo"), {{ y: -8, duration: 0.15, yoyo: true, repeat: 5, ease: "sine.inOut" }}, 0.1);
      // el cartel de horario se balancea
      tl.fromTo(q(".{p}-cartel"), {{ rotation: -14 }}, {{ rotation: 0, svgOrigin: "780 820", duration: 1.0, ease: "elastic.out(1, 0.4)" }}, ABREN - 0.1);
      gsap.set([q(".{p}-nueve"), q(".{p}-a"), q(".{p}-diecinueve")], {{ opacity: 0 }});
      tl.set(q(".{p}-nueve"), {{ opacity: 1 }}, NUEVE);
      tl.fromTo(q(".{p}-nueve"), {{ scale: 1.6 }}, {{ scale: 1, svgOrigin: "780 1010", duration: 0.2, ease: "power3.out", immediateRender: false }}, NUEVE);
      tl.set(q(".{p}-a"), {{ opacity: 1 }}, NUEVE + 0.3);
      tl.set(q(".{p}-diecinueve"), {{ opacity: 1 }}, SIETE);
      tl.fromTo(q(".{p}-cartel"), {{ scale: 1 }}, {{ scale: 1.12, svgOrigin: "780 985", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }}, SIETE);
      golpe(SIETE + 0.05, 10);
      // el Conde se congela
      tl.to(q(".{p}-manos"), {{ y: 10, duration: 0.15 }}, NUEVE + 0.1);
      pop(q(".{p}-preg"), SIETE + 0.1, 0.3);
      tl.to(q(".{p}-preg"), {{ rotation: 10, svgOrigin: "120 -500", duration: 0.15, yoyo: true, repeat: 3 }}, SIETE + 0.4);
      muestra(q(".{p}-e1"), NUEVE);
'''
sfx=[{"t":0.05,"sfx":"risas","vol":0.0001,"max":0.1},{"t":0.1,"sfx":"click-soft","vol":0.25},{"t":0.75,"sfx":"chirrido","vol":0.25},{"t":2.0,"sfx":"golpe","vol":0.3},{"t":2.55,"sfx":"impact-bass-1","vol":0.38,"max":0.6},{"t":2.7,"sfx":"uuh","vol":0.18,"max":1.0}]
sfx=sfx[1:]
escena("s04-horario", 3.45, "", html, js, sfx, ["de 9 a 19"])
