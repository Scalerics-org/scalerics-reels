from lib import *
p="s07"
alas = f'''<g class="{p}-alas">
    <path class="tinta {p}-ai" fill="#160a24" d="M-56 -320 L-300 -500 L-270 -260 L-300 -120 L-160 0 Z" />
    <path class="tinta {p}-ai" fill="#c8102e" d="M-60 -300 L-270 -460 L-246 -260 L-268 -136 L-150 -10 Z" />
    <path class="tinta {p}-ad" fill="#160a24" d="M56 -320 L300 -500 L270 -260 L300 -120 L160 0 Z" />
    <path class="tinta {p}-ad" fill="#c8102e" d="M60 -300 L270 -460 L246 -260 L268 -136 L150 -10 Z" />
    <circle class="tinta" fill="#dfe8c8" cx="-296" cy="-504" r="18" />
    <circle class="tinta" fill="#dfe8c8" cx="296" cy="-504" r="18" />
  </g>'''
# el Conde va encima de las alas: se arma a mano
c = conde(p, 540, 1240, 1.0, boca="grito")
c = c.replace(f'<g class="{p}-conde">', f'<g class="{p}-conde">{alas}', 1)
murci = '<path fill="#12061f" stroke="#f4ead5" stroke-width="3" d="M0 0 C-14 -16 -34 -20 -54 -10 C-44 -6 -40 2 -42 10 C-32 2 -22 4 -14 10 C-10 4 -4 2 0 4 C4 2 10 4 14 10 C22 4 32 2 42 10 C40 2 44 -6 54 -10 C34 -20 14 -16 0 0 Z" />'
bats = "".join(f'<g transform="translate(540 900)"><g class="{p}-m">{murci}</g></g>' for _ in range(6))
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="{p}-luna tinta" fill="#ffd23f" cx="540" cy="860" r="190" />
          <path class="{p}-rayo" fill="#f4ead5" stroke="#12061f" stroke-width="5" stroke-linejoin="round" d="M880 600 L800 760 L860 760 L770 930 L900 730 L840 730 L920 600 Z" />
          {bats}
          {c}
        </svg>
        <div class="afiche {p}-grito" style="top: 592px; font-size: 112px; color: #c8102e; text-shadow: 9px 9px 0 #ffd23f;">¿¡A QUÉ HORA!?</div>'''
js = f'''
      const LOCAL = 0.6, HORA = 1.51;
      tl.fromTo(q(".{p}-luna"), {{ scale: 0.8 }}, {{ scale: 1, svgOrigin: "540 860", duration: 0.4, ease: "back.out(1.5)" }}, 0);
      tl.fromTo(q(".{p}-conde"), {{ y: 40, opacity: 0.6 }}, {{ y: 0, opacity: 1, duration: 0.25 }}, 0);
      // abre la capa: los brazos suben
      tl.fromTo(q(".{p}-alas"), {{ opacity: 0, y: 120 }}, {{ opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.8)" }}, 0.05);
      tl.to(q(".{p}-alas"), {{ y: -14, duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut" }}, 0.5);
      // rayo
      gsap.set(q(".{p}-rayo"), {{ opacity: 0 }});
      tl.set(q(".{p}-rayo"), {{ opacity: 1 }}, LOCAL - 0.02);
      tl.set(q(".{p}-rayo"), {{ opacity: 0 }}, LOCAL + 0.1);
      tl.set(q(".{p}-rayo"), {{ opacity: 1 }}, LOCAL + 0.16);
      tl.to(q(".{p}-rayo"), {{ opacity: 0, duration: 0.3 }}, LOCAL + 0.3);
      // grito
      slam(q(".{p}-grito"), HORA);
      golpe(HORA + 0.05, 20);
      tl.to(q(".{p}-grito"), {{ x: 5, duration: 0.04, yoyo: true, repeat: 15, ease: "none" }}, HORA + 0.2);
      // los murciélagos salen espantados
      const dirs = [[-420, -230], [430, -260], [-460, 60], [470, 40], [-250, -330], [260, 300]];
      qa(".{p}-m").forEach((m, i) => {{
        gsap.set(m, {{ opacity: 0 }});
        tl.fromTo(m, {{ opacity: 1, x: 0, y: 0, scale: 0.4 }}, {{ x: dirs[i][0], y: dirs[i][1], scale: 1.1, duration: 0.8, ease: "power2.out", immediateRender: false }}, HORA + 0.05 + i * 0.04);
        tl.to(m, {{ scaleY: 0.3, duration: 0.07, yoyo: true, repeat: 9 }}, HORA + 0.05);
      }});
'''
sfx=[{"t":0.05,"sfx":"whoosh-cinematic","vol":0.25,"max":0.8},{"t":0.55,"sfx":"trueno","vol":0.45,"max":2.0},{"t":1.45,"sfx":"impact-bass-2","vol":0.4,"max":0.7},{"t":1.6,"sfx":"whoosh","vol":0.25}]
escena("s07-a-que-hora", 2.70, "", html, js, sfx)
