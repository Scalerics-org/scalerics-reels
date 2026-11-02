from lib import *
p="s13"
brazos = f'''<g class="{p}-ibrazo"><path class="tinta" fill="#7a4e2d" d="M40 -170 C90 -160 130 -150 160 -140 L156 -118 C120 -126 80 -136 36 -146 Z" /><circle class="tinta" fill="#c9b98a" cx="166" cy="-130" r="15" /></g>'''
viejo = conde(p, 780, 1240, 0.95)
nuevo = conde(p + "n", 780, 1240, 0.95, boca="sonrisa").replace('fill="#c8102e" d="M-160 0 L-112 -330', 'fill="#ff2b4a" d="M-160 0 L-112 -330')
nuevo = nuevo.replace(f'class="{p}n-conde"', f'class="{p}n-conde"')
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="tinta" fill="#ff8a3d" d="M240 1240 A300 300 0 0 1 840 1240 Z" />
          <path fill="#ffb36b" d="M320 1240 A220 220 0 0 1 760 1240 Z" />
          <path class="tinta" fill="#2a1546" d="M40 1240 C200 1160 360 1200 540 1170 C720 1140 880 1180 1040 1240 Z" />
          {viejo}
          <g class="{p}n-wrap">{nuevo}</g>
          <g class="{p}-brillos">
            <path fill="#ffd23f" stroke="#12061f" stroke-width="3" d="M620 760 l8 -22 l8 22 l22 8 l-22 8 l-8 22 l-8 -22 l-22 -8 Z" />
            <path fill="#ffd23f" stroke="#12061f" stroke-width="3" d="M940 840 l6 -16 l6 16 l16 6 l-16 6 l-6 16 l-6 -16 l-16 -6 Z" />
            <path fill="#ffd23f" stroke="#12061f" stroke-width="3" d="M600 1010 l5 -13 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 Z" />
            <path fill="#ffd23f" stroke="#12061f" stroke-width="3" d="M960 1080 l5 -13 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5 Z" />
          </g>
          {igor(p, 200, 1240, 1.0, brazos)}
          <g class="{p}-caja">
            <g class="{p}-capita">
              <path class="tinta" fill="#ff2b4a" d="M330 1040 L360 930 L440 930 L470 1040 Z" />
              <path class="tinta" fill="#160a24" d="M330 1040 L360 930 L380 930 L372 1040 Z M470 1040 L440 930 L420 930 L428 1040 Z" />
            </g>
            <path class="tinta" fill="#d4a26a" d="M310 1160 V1050 H490 V1160 Z" />
            <path class="linea" d="M400 1050 V1160" />
            <g class="{p}-tapa"><path class="tinta" fill="#e6b77e" d="M300 1050 V1022 H500 V1050 Z" /><path class="tinta" fill="#c8102e" d="M400 1022 c-30 -30 -50 -10 -36 0 Z M400 1022 c30 -30 50 -10 36 0 Z" /></g>
          </g>
        </svg>
        <div class="{p}-tag" data-layout-allow-overlap>PEDIDO · <b>03:00 AM</b></div>'''
css = '''
    $S .s13-tag { position: absolute; left: 250px; top: 1160px; padding: 10px 20px; background: #f4ead5; border: 5px solid #12061f; border-radius: 14px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: #12061f; transform: rotate(-5deg); }
    $S .s13-tag b { color: #1f9a0a; }
    $S .etiqueta { top: 1300px; }
'''
js = f'''
      const LLEGO = 0.55, PAQ = 0.88, COMPRADA = 1.89, TRES = 2.87, EXC = 4.6;
      tl.fromTo(q(".{p}-conde"), {{ opacity: 0.5, x: 60 }}, {{ opacity: 1, x: 0, duration: 0.3 }}, 0);
      // entra el ayudante con la caja
      tl.fromTo(q(".{p}-igor"), {{ x: -260 }}, {{ x: 0, duration: 0.6, ease: "power2.out" }}, 0);
      tl.to(q(".{p}-igor"), {{ y: -8, duration: 0.1, yoyo: true, repeat: 5 }}, 0);
      gsap.set(q(".{p}-caja"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-caja"), {{ opacity: 0, x: -200, y: -40 }}, {{ opacity: 1, x: 0, y: 0, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }}, PAQ - 0.3);
      gsap.set(q(".{p}-capita"), {{ opacity: 0 }});
      // se abre la caja y sale la capa nueva
      tl.to(q(".{p}-tapa"), {{ y: -120, x: -60, rotation: -40, svgOrigin: "400 1036", opacity: 0, duration: 0.4, ease: "power2.out" }}, COMPRADA - 0.1);
      tl.set(q(".{p}-capita"), {{ opacity: 1 }}, COMPRADA);
      tl.fromTo(q(".{p}-capita"), {{ y: 110 }}, {{ y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }}, COMPRADA);
      gsap.set(q(".{p}-tag"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-tag"), {{ opacity: 0, scale: 0.4 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }}, TRES - 0.1);
      // ¡Excelente!: se pone la capa nueva con un giro
      gsap.set(q(".{p}n-wrap"), {{ opacity: 0 }});
      tl.to(q(".{p}-capita"), {{ opacity: 0, x: 300, y: -100, duration: 0.25, ease: "power2.in" }}, EXC - 0.35);
      tl.to(q(".{p}-conde"), {{ opacity: 0, y: -30, duration: 0.15, ease: "power2.in" }}, EXC - 0.12);
      tl.fromTo(q(".{p}n-wrap"), {{ opacity: 0, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }}, EXC);
      qa(".{p}-brillos path").forEach((b, i) => {{
        gsap.set(b, {{ opacity: 0 }});
        tl.fromTo(b, {{ opacity: 0, scale: 0, transformOrigin: "50% 50%" }}, {{ opacity: 1, scale: 1, rotation: 90, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(2)", immediateRender: false }}, EXC + 0.1 + i * 0.08);
      }});
      tl.to(q(".{p}n-conde"), {{ y: -10, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }}, EXC + 0.35);
      muestra(q(".{p}-e1"), PAQ);
      muestra(q(".{p}-e2"), EXC);
'''
sfx=[{"t":0.05,"sfx":"whoosh","vol":0.22},{"t":0.85,"sfx":"golpe","vol":0.3},{"t":1.85,"sfx":"pop","vol":0.35},{"t":2.85,"sfx":"click","vol":0.3},{"t":4.5,"sfx":"whoosh-short","vol":0.3},{"t":4.65,"sfx":"sparkle","vol":0.4},{"t":4.7,"sfx":"chime","vol":0.3}]
escena("s13-paquete", 6.18, css, html, js, sfx, ["llegó al atardecer", "capa nueva"])
