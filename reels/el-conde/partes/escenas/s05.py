from lib import *
p="s05"
rayos = "".join(f'<path class="tinta" fill="#ffd23f" d="M0 -230 L-26 -300 L26 -300 Z" transform="rotate({a})" />' for a in range(0, 360, 30))
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(860 1080)"><g class="{p}-sol">
            <g class="{p}-rayos">{rayos}</g>
            <circle class="tinta" fill="#ffd23f" cx="0" cy="0" r="190" />
            <circle class="linea" cx="-60" cy="-30" r="18" />
            <circle class="linea" cx="40" cy="-30" r="18" />
            <path class="linea" d="M-70 50 Q-10 100 60 50" />
          </g></g>
          <g class="{p}-vereda">
            <path class="tinta" fill="#6d5f86" d="M60 1240 H1020 V1290 H60 Z" />
            <path class="linea" d="M180 1240 v50 M300 1240 v50 M420 1240 v50 M540 1240 v50 M660 1240 v50 M780 1240 v50 M900 1240 v50" />
          </g>
          {conde(p, 440, 1240, 1.0, boca="grito")}
          <g class="{p}-ceniza">
            <path class="tinta" fill="#8a8296" d="M330 1240 C350 1150 530 1150 550 1240 Z" />
            <circle fill="#c8102e" cx="415" cy="1196" r="7" />
            <circle fill="#c8102e" cx="462" cy="1196" r="7" />
            <circle class="tinta" fill="#ffd23f" cx="440" cy="1226" r="11" />
          </g>
          <g class="{p}-humo">
            <circle class="tinta" fill="#b9b2c6" cx="420" cy="1120" r="34" />
            <circle class="tinta" fill="#b9b2c6" cx="470" cy="1060" r="26" />
            <circle class="tinta" fill="#b9b2c6" cx="430" cy="1000" r="20" />
          </g>
        </svg>
        <div class="afiche {p}-am" style="top: 596px; font-size: 100px;">¿DE LA MAÑANA?</div>'''
js = f'''
      const MANANA = 0.23, QUEDO = 1.23, CENIZA = 1.73, VEREDA = 2.48;
      tl.fromTo(q(".{p}-conde"), {{ opacity: 0.5, y: 30 }}, {{ opacity: 1, y: 0, duration: 0.25 }}, 0);
      tl.fromTo(q(".{p}-vereda"), {{ opacity: 0.5 }}, {{ opacity: 1, duration: 0.3 }}, 0);
      // el sol entra desde abajo a la derecha
      tl.fromTo(q(".{p}-sol"), {{ x: 260, y: 400 }}, {{ x: 0, y: 0, duration: 0.6, ease: "back.out(1.3)" }}, 0);
      tl.fromTo(q(".{p}-rayos"), {{ rotation: 0 }}, {{ rotation: 60, svgOrigin: "0 0", duration: DUR, ease: "none" }}, 0);
      slam(q(".{p}-am"), MANANA + 0.05);
      // el Conde tiembla
      tl.to(q(".{p}-conde"), {{ x: 6, duration: 0.05, yoyo: true, repeat: 15, ease: "none" }}, 0.4);
      // se hace ceniza (comedia)
      gsap.set([q(".{p}-ceniza"), ...qa(".{p}-humo circle")], {{ opacity: 0 }});
      tl.to(q(".{p}-conde"), {{ scaleY: 0, scaleX: 1.3, svgOrigin: "0 0", duration: 0.2, ease: "power3.in" }}, CENIZA - 0.2);
      tl.fromTo(q(".{p}-ceniza"), {{ opacity: 0, scale: 0.4 }}, {{ opacity: 1, scale: 1, svgOrigin: "440 1240", duration: 0.25, ease: "back.out(2.5)", immediateRender: false }}, CENIZA);
      qa(".{p}-humo circle").forEach((c, i) => {{
        tl.fromTo(c, {{ opacity: 0, y: 40, scale: 0.5, transformOrigin: "50% 50%" }}, {{ opacity: 0.9, y: -40, scale: 1, transformOrigin: "50% 50%", duration: 0.7, ease: "power2.out", immediateRender: false }}, CENIZA + 0.05 + i * 0.1);
        tl.to(c, {{ opacity: 0, duration: 0.4 }}, CENIZA + 0.8 + i * 0.1);
      }});
      tl.to(q(".{p}-am"), {{ opacity: 0.2, duration: 0.2 }}, CENIZA);
      muestra(q(".{p}-e1"), VEREDA);
      // los ojitos parpadean desde la ceniza
      tl.to(qa(".{p}-ceniza circle"), {{ scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.06, yoyo: true, repeat: 1 }}, VEREDA + 0.4);
'''
sfx=[{"t":0.1,"sfx":"riser","vol":0.25,"max":1.4},{"t":0.25,"sfx":"impact-bass-1","vol":0.35,"max":0.6},{"t":1.55,"sfx":"glitch-1","vol":0.2,"max":0.3},{"t":1.7,"sfx":"golpe","vol":0.35},{"t":1.8,"sfx":"suspiro","vol":0.3,"max":1.2},{"t":2.9,"sfx":"pop","vol":0.2}]
escena("s05-ceniza", 3.54, "\n    $S .etiqueta { top: 1318px; }\n", html, js, sfx, ["vereda del centro · 9:00"])
