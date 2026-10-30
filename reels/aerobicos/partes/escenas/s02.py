from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-rot { font-size: 34px; color: #fff3e8; letter-spacing: 0.24em; }
    [data-composition-id="%ID%"] .s02-play { top: 600px; font-size: 170px; }
    [data-composition-id="%ID%"] .s02-lbl { font-family: "Lexend", sans-serif; font-weight: 900; font-style: italic; }
"""
body = f"""
        <svg class="s02-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s02-ranura"><rect x="0" y="0" width="1080" height="1098"/></clipPath></defs>
          <!-- vincha -->
          <g class="s02-vincha">
            <ellipse cx="290" cy="760" rx="150" ry="62" fill="none" stroke="{D}" stroke-width="44"/>
            <ellipse cx="290" cy="760" rx="150" ry="62" fill="none" stroke="{T}" stroke-width="30"/>
            <path d="M190 732 L196 790 M240 712 L244 822 M290 704 L290 826 M340 712 L336 822 M390 732 L384 790" stroke="{D}" stroke-width="4" opacity="0.45"/>
          </g>
          <!-- calentadores -->
          <g class="s02-calent">
            <g transform="rotate(-8 730 760)"><rect x="672" y="660" width="104" height="210" rx="22" fill="{A}" stroke="{D}" stroke-width="6"/>
              <path d="M680 700 H770 M680 735 H770 M680 770 H770 M680 805 H770 M680 840 H770" stroke="{D}" stroke-width="5" opacity="0.4"/></g>
            <g transform="rotate(10 860 780)"><rect x="806" y="680" width="104" height="210" rx="22" fill="{R}" stroke="{D}" stroke-width="6"/>
              <path d="M814 720 H902 M814 755 H902 M814 790 H902 M814 825 H902 M814 860 H902" stroke="{D}" stroke-width="5" opacity="0.4"/></g>
          </g>
          <text class="s02-rot mono" x="290" y="880" text-anchor="middle" fill="{C}" font-family="IBM Plex Mono" font-weight="600" font-size="34" letter-spacing="8">VINCHA</text>
          <text class="s02-rot2 mono" x="790" y="950" text-anchor="middle" fill="{C}" font-family="IBM Plex Mono" font-weight="600" font-size="34" letter-spacing="8">CALENTADORES</text>
          <!-- cassette (entra en la ranura) -->
          <g clip-path="url(#s02-ranura)"><g class="s02-cassette">
            <rect x="330" y="820" width="420" height="250" rx="16" fill="{D}" stroke="{C}" stroke-width="6"/>
            <rect x="360" y="842" width="360" height="118" rx="8" fill="{C}"/>
            <rect x="360" y="842" width="360" height="30" fill="{R}"/>
            <text class="s02-lbl" x="540" y="918" text-anchor="middle" font-size="44" fill="{D}">AERÓBICOS</text>
            <text x="540" y="948" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="22" fill="{V}" letter-spacing="2">PARA COMERCIANTES</text>
            <rect x="430" y="985" width="220" height="60" rx="30" fill="{V}" stroke="{C}" stroke-width="4"/>
            <circle class="s02-rueda" cx="470" cy="1015" r="20" fill="{C}"/><circle class="s02-rueda" cx="610" cy="1015" r="20" fill="{C}"/>
          </g></g>
          <!-- videocasetera -->
          <g class="s02-vcr">
            <rect x="150" y="1080" width="780" height="200" rx="18" fill="{V}" stroke="{C}" stroke-width="6"/>
            <rect x="315" y="1092" width="450" height="20" rx="6" fill="{D}"/>
            <rect x="190" y="1170" width="250" height="70" rx="8" fill="{D}" stroke="{C}" stroke-width="3"/>
            <text class="s02-disp" x="315" y="1218" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="36" fill="{T}" letter-spacing="4">STOP</text>
            <text class="s02-disp2" x="315" y="1218" text-anchor="middle" font-family="IBM Plex Mono" font-weight="600" font-size="36" fill="{A}" letter-spacing="4" opacity="0">PLAY</text>
            <circle cx="540" cy="1205" r="18" fill="{D}" stroke="{C}" stroke-width="3"/><circle cx="600" cy="1205" r="18" fill="{D}" stroke="{C}" stroke-width="3"/>
            <circle class="s02-btn" cx="660" cy="1205" r="18" fill="{R}" stroke="{C}" stroke-width="3"/><circle cx="720" cy="1205" r="18" fill="{D}" stroke="{C}" stroke-width="3"/>
            <rect x="790" y="1190" width="100" height="30" rx="6" fill="{D}"/>
            <circle class="s02-led" cx="880" cy="1150" r="10" fill="{R}"/>
          </g>
        </svg>
        <div class="big a s02-play">¡Dale play!</div>
"""
js = """
      const CAL = 0.52, DALE = 1.61, PLAY = 1.87, CAS = 2.21;
      // cuadro 0: la vincha ya está cayendo
      tl.fromTo(q(".s02-vincha"), { opacity: 0.4, y: -160, rotation: -30, svgOrigin: "290 760" }, { opacity: 1, y: 0, rotation: 0, svgOrigin: "290 760", duration: 0.35, ease: "back.out(2)" }, 0);
      tl.to(q(".s02-vincha"), { rotation: 8, svgOrigin: "290 760", duration: 0.22, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0.4);
      pop(q(".s02-rot"), 0.15);
      gsap.set(q(".s02-calent"), { opacity: 0 });
      tl.fromTo(q(".s02-calent"), { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, CAL);
      tl.to(q(".s02-calent"), { y: -18, duration: 0.23, yoyo: true, repeat: 7, ease: "sine.inOut" }, CAL + 0.35);
      pop(q(".s02-rot2"), CAL + 0.1);
      // la videocasetera sube desde el piso, el cassette entra en "play"
      tl.fromTo(q(".s02-vcr"), { y: 420, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" }, 0.9);
      gsap.set(q(".s02-cassette"), { opacity: 0 });
      tl.fromTo(q(".s02-cassette"), { y: -700, opacity: 1 }, { y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, 1.15);
      tl.to(q(".s02-cassette"), { y: 270, duration: 0.3, ease: "power2.in" }, PLAY - 0.1);
      tl.to(qa(".s02-rueda"), { scale: 0.6, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 5 }, 1.5);
      tl.to(q(".s02-btn"), { scale: 0.7, transformOrigin: "50% 50%", duration: 0.08, yoyo: true, repeat: 1 }, PLAY + 0.15);
      tl.set(q(".s02-disp"), { opacity: 0 }, PLAY + 0.2); tl.set(q(".s02-disp2"), { opacity: 1 }, PLAY + 0.2);
      tl.to(q(".s02-led"), { opacity: 0.2, duration: 0.1, yoyo: true, repeat: 9 }, PLAY + 0.2);
      // vincha y calentadores salen volando hacia arriba (te los pusiste)
      tl.to([q(".s02-vincha"), q(".s02-rot")], { y: -300, opacity: 0, duration: 0.3, ease: "power2.in" }, DALE - 0.1);
      tl.to([q(".s02-calent"), q(".s02-rot2")], { y: -300, opacity: 0, duration: 0.3, ease: "power2.in" }, DALE);
      golpe(q(".s02-play"), CAS - 0.05, -5, 3);
      sacudon(CAS, 1.5);
      tl.to(q(".s02-vcr"), { y: -10, duration: BEAT / 2, yoyo: true, repeat: 1, ease: "sine.inOut" }, CAS + 0.1);
"""
sfx = [{"t": 0.05, "sfx": "whoosh", "vol": 0.25}, {"t": 0.3, "sfx": "pop", "vol": 0.3}, {"t": 0.6, "sfx": "pop", "vol": 0.3},
       {"t": 1.9, "sfx": "click", "vol": 0.45}, {"t": 2.05, "sfx": "key-press", "vol": 0.35}, {"t": 2.16, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.6}]
escena("s02-cassette", p, 3.12, css, body, js, sfx)
