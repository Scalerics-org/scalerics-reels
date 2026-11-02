from lib import *
p="s14"
murci = '<path fill="#12061f" stroke="#f4ead5" stroke-width="3" d="M0 0 C-14 -16 -34 -20 -54 -10 C-44 -6 -40 2 -42 10 C-32 2 -22 4 -14 10 C-10 4 -4 2 0 4 C4 2 10 4 14 10 C22 4 32 2 42 10 C40 2 44 -6 54 -10 C34 -20 14 -16 0 0 Z" />'
css = '''
    $S .s14-arroba { position: absolute; left: 0; right: 0; top: 650px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 300px; line-height: 1; color: #c8102e; -webkit-text-stroke: 12px #12061f; paint-order: stroke fill; text-shadow: 10px 10px 0 #12061f; }
    $S .s14-reloj { position: absolute; left: 700px; top: 980px; padding: 12px 22px; background: #12061f; border: 5px solid #5ce611; border-radius: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 46px; color: #5ce611; transform: rotate(5deg); }
'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 820)"><g class="{p}-luna"><circle class="tinta" fill="#ffd23f" cx="0" cy="0" r="210" /><circle fill="#f0bd2a" cx="-110" cy="-80" r="30" opacity="0.7" /><circle fill="#f0bd2a" cx="100" cy="80" r="22" opacity="0.7" /></g></g>
          <g class="{p}-pijama">
            <path class="linea" stroke="#f4ead5" style="stroke:#f4ead5" stroke-width="4" d="M90 1000 Q240 1030 390 1000" />
            <path class="tinta" fill="#9ec5ff" d="M170 1016 L130 1050 L150 1080 L180 1064 V1170 H300 V1064 L330 1080 L350 1050 L310 1016 Q240 1040 170 1016 Z" />
            <path class="linea" stroke-width="4" d="M210 1030 V1170 M240 1036 V1170 M270 1030 V1170" />
            <path class="tinta" fill="#f4ead5" d="M180 1012 l8 -18 l8 18 Z M284 1012 l8 -18 l8 18 Z" />
            <g transform="translate(240 990)"><g class="{p}-m">{murci}</g></g>
          </g>
        </svg>
        <div class="{p}-arroba">@</div>
        <div class="afiche {p}-etq" style="top: 1196px; font-size: 92px;">ETIQUETALO</div>
        <div class="{p}-reloj">3:00 AM</div>'''
js = f'''
      const PIJAMA = 1.13, TRES = 1.91;
      tl.fromTo(q(".{p}-luna"), {{ scale: 0.7, opacity: 0.5 }}, {{ scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }}, 0);
      tl.fromTo(q(".{p}-arroba"), {{ opacity: 0, y: -300, scale: 1.4 }}, {{ opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power4.in" }}, 0.0);
      golpe(0.3, 16);
      tl.to(q(".{p}-arroba"), {{ rotation: 8, duration: 0.5, yoyo: true, repeat: 9, ease: "sine.inOut" }}, 0.5);
      pop(q(".{p}-pijama"), PIJAMA - 0.1, 0.5);
      tl.to(q(".{p}-m"), {{ scaleY: 0.4, duration: 0.12, yoyo: true, repeat: 25, ease: "sine.inOut" }}, PIJAMA);
      pop(q(".{p}-reloj"), TRES - 0.05, 0.4);
      tl.to(q(".{p}-reloj"), {{ scale: 1.08, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }}, TRES + 0.4);
      slam(q(".{p}-etq"), 2.75);
      golpe(2.8, 10);
      tl.to(q(".{p}-etq"), {{ y: -6, duration: 0.5, yoyo: true, repeat: 4, ease: "sine.inOut" }}, 3.2);
'''
sfx=[{"t":0.25,"sfx":"impact-bass-1","vol":0.42,"max":0.7},{"t":1.05,"sfx":"pop","vol":0.3},{"t":1.9,"sfx":"pop","vol":0.3},{"t":2.7,"sfx":"impact-bass-2","vol":0.4,"max":0.7},{"t":2.8,"sfx":"trueno","vol":0.25,"max":1.8}]
escena("s14-cta", 6.16, css, html, js, sfx)
