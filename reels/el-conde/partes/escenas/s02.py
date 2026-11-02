from lib import *
p="s02"
agujeros = f'''<g class="{p}-agujeros">
    <ellipse class="tinta" fill="#23104a" cx="-118" cy="-90" rx="24" ry="18" />
    <ellipse class="tinta" fill="#23104a" cx="120" cy="-150" rx="18" ry="24" />
    <ellipse class="tinta" fill="#23104a" cx="-96" cy="-220" rx="16" ry="13" />
  </g>'''
castillo = f'''          <circle class="{p}-luna tinta" fill="#ffd23f" cx="840" cy="790" r="120" />
          <g class="{p}-castillo">
            <path class="tinta" fill="#2a1546" d="M80 1250 C260 1070 820 1070 1000 1250 Z" />
            <g class="{p}-torres">
              <path class="tinta" fill="#160a24" d="M380 1110 V900 h60 V1110 Z M640 1110 V900 h60 V1110 Z M470 1110 V820 h140 V1110 Z M380 1110 h320 V980 H380 Z" />
              <path class="tinta" fill="#c8102e" d="M370 902 L410 820 L450 902 Z M630 902 L670 820 L710 902 Z M460 822 L540 700 L620 822 Z" />
              <path class="tinta" fill="#160a24" d="M380 980 v-18 h20 v18 h20 v-18 h20 v18 M640 980 v-18 h20 v18 h20 v-18 h20 v18" />
              <rect class="{p}-vent" fill="#b6ff3b" x="400" y="930" width="18" height="30" rx="9" />
              <rect class="{p}-vent" fill="#b6ff3b" x="662" y="930" width="18" height="30" rx="9" />
              <rect class="{p}-vent" fill="#b6ff3b" x="528" y="850" width="24" height="40" rx="12" />
              <path class="tinta" fill="#12061f" d="M510 1110 v-70 q30 -36 60 0 v70 Z" />
            </g>
            <g class="{p}-antorchas">
              <path class="tinta" fill="#7a4e2d" d="M486 1060 h10 v40 h-10 Z M584 1060 h10 v40 h-10 Z" />
              <path class="{p}-llama tinta" fill="#b6ff3b" d="M491 1060 c-14 -14 -6 -30 0 -40 c6 10 14 26 0 40 Z" />
              <path class="{p}-llama tinta" fill="#b6ff3b" d="M589 1060 c-14 -14 -6 -30 0 -40 c6 10 14 26 0 40 Z" />
            </g>
          </g>
          <g class="{p}-cartel">
            <path class="tinta" fill="#7a4e2d" d="M212 1140 h16 v110 h-16 Z" />
            <rect class="tinta" fill="#1f7a4a" x="70" y="1060" width="300" height="90" rx="10" />
            <rect fill="none" stroke="#f4ead5" stroke-width="4" x="80" y="1070" width="280" height="70" rx="6" />
            <text x="220" y="1118" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="38" fill="#f4ead5">TACUAREMBÓ</text>
          </g>'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
{castillo}
          {conde(p, 540, 1240, 1.12, agujeros)}
          <g class="{p}-polilla">
            <path class="tinta" fill="#c9b98a" d="M0 0 C-20 -20 -36 -6 -30 8 C-20 12 -8 6 0 0 C8 6 20 12 30 8 C36 -6 20 -20 0 0 Z" />
          </g>
        </svg>
        <div class="afiche {p}-titulo" style="top: 590px; font-size: 150px;">EL CONDE</div>'''
css = '''
'''
js = f'''
      const CONDE = 0.38, CASTILLO = 1.73, TACU = 2.48, SOLO = 3.76, NOCHE = 4.44, NECESITO = 5.0, CAPA = 6.01;
      // cuadro 0: título y castillo ya a medio aparecer
      tl.fromTo(q(".{p}-titulo"), {{ opacity: 0.3, scale: 1.4 }}, {{ opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" }}, 0);
      golpe(CONDE + 0.05, 10);
      tl.fromTo(q(".{p}-castillo"), {{ y: 200, opacity: 0.4 }}, {{ y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }}, 0);
      tl.fromTo(q(".{p}-torres"), {{ y: 160, opacity: 0 }}, {{ y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.6)" }}, CASTILLO - 0.25);
      qa(".{p}-vent").forEach((v, i) => tl.fromTo(v, {{ opacity: 0 }}, {{ opacity: 1, duration: 0.1, immediateRender: false }}, CASTILLO + 0.2 + i * 0.15));
      qa(".{p}-llama").forEach((l, i) => tl.fromTo(l, {{ scaleY: 0.8 }}, {{ scaleY: 1.15, svgOrigin: i ? "589 1060" : "491 1060", duration: 0.18, yoyo: true, repeat: 30, ease: "sine.inOut" }}, 0));
      pop(q(".{p}-cartel"), TACU - 0.05, 0.4);
      tl.to(q(".{p}-cartel"), {{ rotation: -3, svgOrigin: "220 1250", duration: 0.15, yoyo: true, repeat: 3 }}, TACU + 0.3);
      // la luna sube: solo de noche
      tl.fromTo(q(".{p}-luna"), {{ y: 220, scale: 0.6 }}, {{ y: 0, scale: 1, svgOrigin: "840 790", duration: 0.7, ease: "power2.out" }}, SOLO - 0.1);
      muestra(q(".{p}-e1"), NOCHE);
      // cambia el plano: el castillo se aleja, entra el Conde con la capa vieja
      tl.to([q(".{p}-castillo"), q(".{p}-cartel"), q(".{p}-titulo")], {{ opacity: 0.18, duration: 0.3 }}, NECESITO);
      tl.fromTo(q(".{p}-conde"), {{ opacity: 0, y: 120 }}, {{ opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: true }}, NECESITO + 0.05);
      gsap.set(qa(".{p}-agujeros ellipse"), {{ opacity: 0 }});
      qa(".{p}-agujeros ellipse").forEach((a, i) => tl.fromTo(a, {{ opacity: 0, scale: 0 }}, {{ opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.2, ease: "back.out(3)", immediateRender: false }}, CAPA + i * 0.12));
      tl.to(q(".{p}-cejas"), {{ y: -6, duration: 0.2 }}, CAPA);
      muestra(q(".{p}-e2"), CAPA);
      // la polilla sale de un agujero y se va volando
      gsap.set(q(".{p}-polilla"), {{ opacity: 0, x: 410, y: 1140 }});
      tl.set(q(".{p}-polilla"), {{ opacity: 1 }}, CAPA + 0.2);
      tl.to(q(".{p}-polilla"), {{ x: 820, y: 760, duration: 1.0, ease: "sine.inOut" }}, CAPA + 0.2);
      tl.to(q(".{p}-polilla"), {{ scaleY: 0.3, duration: 0.08, yoyo: true, repeat: 11 }}, CAPA + 0.2);
'''
sfx=[{"t":0.3,"sfx":"gong","vol":0.3,"max":1.6},{"t":1.6,"sfx":"golpe","vol":0.3},{"t":2.45,"sfx":"pop","vol":0.3},{"t":3.7,"sfx":"magia","vol":0.25,"max":1.2},{"t":5.05,"sfx":"whoosh","vol":0.25},{"t":6.0,"sfx":"pop","vol":0.3},{"t":6.3,"sfx":"pop","vol":0.25}]
escena("s02-castillo", 7.36, css, html, js, sfx, ["solo de noche", "capa vieja · siglo XVII"])
