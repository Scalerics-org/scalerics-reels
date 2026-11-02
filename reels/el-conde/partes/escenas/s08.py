from lib import *
p="s08"
senial = f'''<g class="{p}-brazo"><path class="tinta" fill="#7a4e2d" d="M50 -160 C110 -170 170 -190 220 -230 L232 -214 C186 -170 120 -144 50 -136 Z" /><circle class="tinta" fill="#c9b98a" cx="230" cy="-226" r="15" /></g>'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <linearGradient id="{p}-cielo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#ff8a3d" /><stop offset="0.6" stop-color="#ffb36b" /><stop offset="1" stop-color="#ffd23f" />
            </linearGradient>
            <clipPath id="{p}-ventclip"><path d="M320 960 V720 Q540 520 760 720 V960 Z" /></clipPath>
            <clipPath id="{p}-ataud-clip"><rect x="0" y="0" width="1080" height="1150" /></clipPath>
          </defs>
          <!-- ventana del castillo con el amanecer -->
          <g clip-path="url(#{p}-ventclip)">
            <rect fill="#23104a" x="300" y="560" width="480" height="420" />
            <rect class="{p}-cielo" fill="url(#{p}-cielo)" x="300" y="560" width="480" height="420" />
            <g class="{p}-sol"><circle class="tinta" fill="#ffd23f" cx="540" cy="930" r="90" /></g>
            <path class="tinta" fill="#2a1546" d="M300 960 L420 900 L520 940 L640 880 L780 940 V980 H300 Z" />
          </g>
          <path class="tinta" fill="none" stroke-width="12" d="M320 960 V720 Q540 520 760 720 V960 Z" />
          <path class="linea" stroke-width="8" d="M540 600 V960 M320 820 H760" />
          <rect class="tinta" fill="#2a1546" x="300" y="958" width="480" height="26" />
          <!-- retrato del primo -->
          <g class="{p}-retrato">
            <path class="linea" stroke="#ffd23f" d="M912 600 L890 640 M912 600 L934 640" style="stroke:#ffd23f" />
            <ellipse class="tinta" fill="#ffd23f" cx="912" cy="770" rx="118" ry="150" />
            <ellipse class="tinta" fill="#3a1766" cx="912" cy="770" rx="94" ry="126" />
            <g class="{p}-primo">
              <path class="tinta" fill="#c8102e" d="M850 880 L878 800 L946 800 L974 880 Z" />
              <path class="tinta" fill="#dfe8c8" d="M872 760 C870 700 954 700 952 760 C950 796 930 812 912 814 C894 812 874 796 872 760 Z" />
              <path class="tinta" fill="#160a24" d="M868 754 C862 680 962 680 956 754 C946 724 930 722 912 744 C894 722 878 724 868 754 Z" />
              <path class="tinta" fill="#160a24" d="M884 778 Q912 766 940 778 Q912 788 884 778 Z" />
              <path class="tinta" fill="#5a0c1c" d="M892 790 Q912 812 932 790 Z" />
              <path class="linea" stroke-width="4" d="M888 752 l12 6 M936 752 l-12 6" />
            </g>
            <rect class="tinta" fill="#f4ead5" x="852" y="904" width="120" height="34" rx="6" />
            <text x="912" y="930" text-anchor="middle" font-family="Cinzel" font-weight="900" font-size="22" fill="#12061f">PRIMO D.</text>
          </g>
          <text class="{p}-ja1" x="730" y="660" font-family="Cinzel" font-weight="900" font-size="64" fill="#ffd23f" stroke="#12061f" stroke-width="8" paint-order="stroke" transform="rotate(-12 730 660)">JA</text>
          <text class="{p}-ja2" x="930" y="980" font-family="Cinzel" font-weight="900" font-size="56" fill="#ffd23f" stroke="#12061f" stroke-width="8" paint-order="stroke" transform="rotate(10 930 980)">JA JA</text>
          <!-- ataúd con el Conde -->
          <g clip-path="url(#{p}-ataud-clip)"><g class="{p}-baja">{conde(p, 650, 1160, 0.62, boca="grito")}</g></g>
          <path class="tinta" fill="#5a3520" d="M420 1160 L470 1100 L880 1100 L920 1160 L880 1236 L470 1236 Z" />
          <path class="linea" d="M640 1120 v80 M610 1150 h60" stroke="#ffd23f" style="stroke:#ffd23f" />
          <g class="{p}-tapa"><path class="tinta" fill="#7a4e2d" d="M420 1100 L470 1060 L880 1060 L920 1100 Z" /></g>
          {igor(p, 160, 1240, 0.95, senial)}
        </svg>'''
js = f'''
      const SALIENDO = 0.88, SOL = 1.44, OTRA = 2.25, CAPA = 3.23, PRIMO = 4.67, DRAC = 4.95, REIR = 5.86;
      tl.fromTo(q(".{p}-igor"), {{ x: -100, opacity: 0.5 }}, {{ x: 0, opacity: 1, duration: 0.3 }}, 0);
      gsap.set(q(".{p}-brazo"), {{ opacity: 0 }});
      tl.set(q(".{p}-brazo"), {{ opacity: 1 }}, 0.3);
      tl.fromTo(q(".{p}-brazo"), {{ rotation: 40 }}, {{ rotation: 0, svgOrigin: "50 -150", duration: 0.25, ease: "back.out(2)", immediateRender: false }}, 0.3);
      // el cielo se pone naranja y sale el sol
      tl.fromTo(q(".{p}-cielo"), {{ opacity: 0 }}, {{ opacity: 1, duration: 1.6, ease: "power1.inOut" }}, 0.2);
      tl.fromTo(q(".{p}-sol"), {{ y: 200 }}, {{ y: 0, duration: 2.2, ease: "power2.out" }}, SALIENDO - 0.4);
      tl.to(q(".{p}-igor"), {{ x: 4, duration: 0.05, yoyo: true, repeat: 11, ease: "none" }}, SOL);
      // el Conde salta al ataúd y la tapa baja
      tl.fromTo(q(".{p}-baja"), {{ y: 0 }}, {{ y: -60, duration: 0.18, ease: "power2.out" }}, OTRA - 0.1);
      tl.to(q(".{p}-baja"), {{ y: 420, duration: 0.45, ease: "power2.in" }}, OTRA + 0.25);
      gsap.set(q(".{p}-tapa"), {{ rotation: -60, svgOrigin: "420 1100" }});
      tl.to(q(".{p}-tapa"), {{ rotation: -8, svgOrigin: "420 1100", duration: 0.5, ease: "power2.in" }}, OTRA + 0.6);
      tl.to(q(".{p}-tapa"), {{ rotation: 0, svgOrigin: "420 1100", duration: 0.12, ease: "power2.in" }}, CAPA + 0.1);
      golpe(CAPA + 0.22, 10);
      muestra(q(".{p}-e1"), CAPA);
      // el primo Drácula se ríe desde el cuadro
      tl.fromTo(q(".{p}-retrato"), {{ opacity: 0.25 }}, {{ opacity: 1, duration: 0.2, immediateRender: true }}, PRIMO - 0.2);
      tl.to(q(".{p}-retrato"), {{ scale: 1.08, svgOrigin: "912 770", duration: 0.15, yoyo: true, repeat: 1 }}, DRAC);
      tl.to(q(".{p}-primo"), {{ y: -8, duration: 0.08, yoyo: true, repeat: 17, ease: "none" }}, DRAC + 0.2);
      pop(q(".{p}-ja1"), DRAC + 0.3, 0.3);
      pop(q(".{p}-ja2"), REIR - 0.1, 0.3);
      tl.to(q(".{p}-retrato"), {{ rotation: 4, svgOrigin: "912 600", duration: 0.1, yoyo: true, repeat: 7 }}, REIR);
      muestra(q(".{p}-e2"), DRAC + 0.1);
'''
sfx=[{"t":0.1,"sfx":"riser","vol":0.25,"max":1.6},{"t":1.4,"sfx":"campana","vol":0.25,"max":1.5},{"t":2.4,"sfx":"whoosh","vol":0.25},{"t":3.3,"sfx":"golpe","vol":0.42},{"t":4.95,"sfx":"risas","vol":0.3,"max":2.0},{"t":5.9,"sfx":"pop","vol":0.25}]
escena("s08-amanecer", 6.99, "", html, js, sfx, ["otra noche sin capa", "primo d. · 600 años"])
