from lib import *
p="s09"
puntero = f'''<g class="{p}-brazo"><path class="tinta" fill="#7a4e2d" d="M50 -160 C100 -170 140 -186 170 -206 L182 -190 C150 -166 110 -150 50 -138 Z" /><circle class="tinta" fill="#c9b98a" cx="180" cy="-200" r="15" /><path class="linea" stroke="#ffd23f" style="stroke:#ffd23f" stroke-width="7" d="M184 -204 L290 -290" /></g>'''
def card(i, x, y, label, dibujo):
    return f'''<g class="{p}-card {p}-c{i}">
    <rect class="tinta" fill="#f4ead5" x="{x}" y="{y}" width="300" height="290" rx="22" />
    {dibujo}
    <text x="{x+150}" y="{y+268}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="26" fill="#12061f">{label}</text>
  </g>'''
X1, X2, Y1, Y2 = 250, 600, 610, 935
noche = f'''<rect class="tinta" fill="#23104a" x="{X1+40}" y="{Y1+30}" width="220" height="190" rx="10" />
    <circle class="tinta" fill="#ffd23f" cx="{X1+100}" cy="{Y1+90}" r="34" />
    <circle fill="#23104a" cx="{X1+118}" cy="{Y1+80}" r="30" />
    <path class="linea" stroke="#f4ead5" style="stroke:#f4ead5" stroke-width="4" d="M{X1+150} {Y1+30} V{Y1+220} M{X1+40} {Y1+125} H{X1+260}" />
    <rect class="tinta" fill="#12061f" x="{X1+160}" y="{Y1+150}" width="92" height="50" rx="8" />
    <text x="{X1+206}" y="{Y1+186}" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#b6ff3b">3:00</text>'''
cx2 = X2+150
pijama = f'''<path class="tinta" fill="#9ec5ff" d="M{cx2-60} {Y1+230} V{Y1+130} q60 -26 120 0 V{Y1+230} Z" />
    <path class="linea" stroke-width="4" d="M{cx2-36} {Y1+122} V{Y1+230} M{cx2-12} {Y1+116} V{Y1+230} M{cx2+12} {Y1+116} V{Y1+230} M{cx2+36} {Y1+122} V{Y1+230}" />
    <circle class="tinta" fill="#e8c9a0" cx="{cx2}" cy="{Y1+92}" r="38" />
    <path class="tinta" fill="#c8102e" d="M{cx2-40} {Y1+80} Q{cx2} {Y1+20} {cx2+60} {Y1+40} L{cx2+86} {Y1+86} L{cx2+40} {Y1+70} Q{cx2} {Y1+66} {cx2-40} {Y1+80} Z" />
    <circle class="tinta" fill="#f4ead5" cx="{cx2+88}" cy="{Y1+90}" r="12" />
    <path class="linea" stroke-width="4" d="M{cx2-18} {Y1+94} q6 5 12 0 M{cx2+6} {Y1+94} q6 5 12 0" />
    <path class="linea" stroke-width="4" d="M{cx2-8} {Y1+112} q8 4 16 0" />'''
cx3 = X1+150
celular = f'''<path class="tinta" fill="#e8c9a0" d="M{cx3-80} {Y2+230} C{cx3-90} {Y2+170} {cx3-70} {Y2+140} {cx3-40} {Y2+130} L{cx3+60} {Y2+130} L{cx3+70} {Y2+230} Z" />
    <rect class="tinta" fill="#12061f" x="{cx3-50}" y="{Y2+24}" width="100" height="180" rx="16" />
    <rect fill="#b6ff3b" x="{cx3-38}" y="{Y2+44}" width="76" height="130" rx="6" />
    <rect fill="#12061f" x="{cx3-26}" y="{Y2+60}" width="52" height="40" rx="4" />
    <rect fill="#12061f" x="{cx3-26}" y="{Y2+112}" width="52" height="14" rx="4" />
    <rect fill="#c8102e" x="{cx3-26}" y="{Y2+140}" width="52" height="20" rx="6" />
    <path class="tinta" fill="#e8c9a0" d="M{cx3-56} {Y2+150} q-20 10 -6 30 l30 -6 Z" />'''
cx4 = X2+150
interior = f'''<path class="tinta" fill="#b6ff3b" d="M{cx4-80} {Y2+60} L{cx4-10} {Y2+30} L{cx4+40} {Y2+50} L{cx4+90} {Y2+110} L{cx4+80} {Y2+170} L{cx4+40} {Y2+210} L{cx4-30} {Y2+215} L{cx4-70} {Y2+190} L{cx4-96} {Y2+130} Z" />
    <g class="{p}-pin"><path class="tinta" fill="#c8102e" d="M{cx4-10} {Y2+120} C{cx4-40} {Y2+90} {cx4-40} {Y2+50} {cx4-10} {Y2+50} C{cx4+20} {Y2+50} {cx4+20} {Y2+90} {cx4-10} {Y2+120} Z" /><circle fill="#f4ead5" cx="{cx4-10}" cy="{Y2+76}" r="10" /></g>
    <circle fill="#12061f" cx="{cx4-20}" cy="{Y2+196}" r="7" />'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {card(1, X1, Y1, "DE NOCHE", noche)}
          {card(2, X2, Y1, "EN PIJAMA", pijama)}
          {card(3, X1, Y2, "DESDE EL CELULAR", celular)}
          {card(4, X2, Y2, "DESDE EL INTERIOR", interior)}
          {igor(p, 120, 1240, 0.8, puntero)}
        </svg>
        <div class="afiche {p}-unico" style="top: 600px; font-size: 100px;">NO ES EL<br />ÚNICO</div>'''
js = f'''
      const UNICO = 1.2, MUCHA = 1.91, NOCHE = 3.44, PIJAMA = 4.16, CEL = 5.2, INT = 6.08;
      tl.fromTo(q(".{p}-igor"), {{ x: 200, y: -230, scale: 1.85, opacity: 0.5 }}, {{ x: 240, y: -230, scale: 1.85, opacity: 1, duration: 0.3, ease: "power3.out" }}, 0);
      tl.to(q(".{p}-igor"), {{ x: 0, y: 0, scale: 1, duration: 0.4, ease: "power3.inOut" }}, 3.0);
      tl.fromTo(q(".{p}-brazo"), {{ rotation: 30 }}, {{ rotation: 0, svgOrigin: "50 -150", duration: 0.3, ease: "back.out(2)" }}, 0.2);
      tl.to(q(".{p}-igor-cabeza"), {{ rotation: 6, svgOrigin: "60 -190", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }}, 0.4);
      gsap.set(q(".{p}-unico"), {{ lineHeight: 1.05 }});
      slam(q(".{p}-unico"), UNICO);
      tl.to(q(".{p}-unico"), {{ scale: 1.05, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }}, UNICO + 0.2);
      tl.to(q(".{p}-unico"), {{ opacity: 0, y: -40, duration: 0.25, ease: "power2.in" }}, NOCHE - 0.3);
      muestra(q(".{p}-e1"), MUCHA);
      [[".{p}-c1", NOCHE], [".{p}-c2", PIJAMA], [".{p}-c3", CEL], [".{p}-c4", INT]].forEach(([s, t]) => {{
        gsap.set(q(s), {{ opacity: 0 }});
        tl.fromTo(q(s), {{ opacity: 0, scale: 0.5, transformOrigin: "50% 50%" }}, {{ opacity: 1, scale: 1, transformOrigin: "50% 50%", duration: 0.32, ease: "back.out(1.8)", immediateRender: false }}, t - 0.08);
      }});
      tl.fromTo(q(".{p}-pin"), {{ y: -60 }}, {{ y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }}, INT + 0.1);
      tl.to(q(".{p}-brazo"), {{ rotation: 12, svgOrigin: "50 -150", duration: 0.12, yoyo: true, repeat: 1 }}, CEL);
'''
sfx=[{"t":0.05,"sfx":"whoosh","vol":0.22},{"t":1.15,"sfx":"impact-bass-1","vol":0.38,"max":0.6},{"t":3.38,"sfx":"pop","vol":0.3},{"t":4.1,"sfx":"pop","vol":0.3},{"t":5.15,"sfx":"pop","vol":0.3},{"t":6.0,"sfx":"pop","vol":0.3},{"t":6.3,"sfx":"ping","vol":0.25}]
escena("s09-pijama", 7.02, "", html, js, sfx, ["así compra mucha gente"])
