ID = "s09-basta"; DUR = 3.97
CSS = """
    $ .s09-basta { position: absolute; left: 0; right: 0; top: 590px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; line-height: 1; color: #ff4fa3; text-transform: uppercase; text-shadow: 0 0 34px rgba(255, 79, 163, 0.6); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s09", "", 520, 1470, 360, 60, 520) + """
          <g class="s09-mago"><g transform="translate(250 720) scale(1.45)">""" + MAGO("s09") + """
            <path class="pl s09-vapor" d="M100 60 C80 30 110 10 90 -20 M260 60 C280 30 250 10 270 -20 M180 20 C160 -10 200 -30 180 -60" stroke-width="7" />
          </g></g>
          <g class="s09-p1"><path d="M711 1143 L773 1049" stroke="#e6e8f0" stroke-width="29" stroke-linecap="round" /><path d="M711 1143 L773 1049" stroke="#0a0610" stroke-width="13" stroke-linecap="round" /></g>
          <g class="s09-p2"><path d="M773 1049 L836 955" stroke="#e6e8f0" stroke-width="29" stroke-linecap="round" /><path d="M773 1049 L836 955" stroke="#0a0610" stroke-width="13" stroke-linecap="round" /><path d="M820 979 L836 955" stroke="#e6e8f0" stroke-width="17" stroke-linecap="round" /></g>
          """ + HUMO("s09", "s09-puf", 780, 1050, 0.8) + """
          """ + DESTELLOS("s09", "s09-d", [(700, 1000, 20), (860, 1100, 24), (800, 930, 16)], "#ff4fa3") + """
        </svg>
        <div class="s09-basta">¡Basta!</div>
"""
JS = """
      const ESTO = 0.89, ARREGLA = 1.44, HARRY = 1.95, POTTER = 2.44, VARITA = 2.96;
      golpe(".s09-basta", 0.05, 2.4);
      sacudon(0.08, 1.5);
      tl.fromTo(q(".s09-mago"), { scale: 1.1, svgOrigin: "520 1530" }, { scale: 1, svgOrigin: "520 1530", duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s09-galera"), { y: -60 }, { y: 0, duration: 0.4, ease: "bounce.out" }, 0.05);
      tl.set(q(".s09-ceja"), { rotation: 10, svgOrigin: "180 205" }, 0);
      dibujar(".s09-vapor", 0.1, 0.4);
      tl.to(q(".s09-vapor"), { y: -30, opacity: 0, duration: 0.6 }, 0.6);
      habla(".s09-boca", 0, 3.3, "180 302");
      tl.to(q(".s09-basta"), { opacity: 0, y: -80, duration: 0.25 }, ESTO + 0.3);
      // la varita: la sacude furioso
      tl.fromTo(q(".s09-brazo"), { rotation: 0, svgOrigin: "276 418" }, { rotation: -16, svgOrigin: "276 418", duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, ARREGLA);
      destello(".s09-d path", HARRY, 2);
      // ... y se le parte en dos
      gsap.set([q(".s09-p1"), q(".s09-p2")], { opacity: 0 });
      tl.set(q(".s09-varita"), { opacity: 0 }, VARITA);
      tl.set([q(".s09-p1"), q(".s09-p2")], { opacity: 1 }, VARITA);
      tl.to(q(".s09-p2"), { rotation: 70, svgOrigin: "773 1049", y: 420, x: 60, duration: 0.7, ease: "power2.in" }, VARITA);
      tl.to(q(".s09-p1"), { rotation: -40, svgOrigin: "711 1143", duration: 0.3, ease: "back.out(2)" }, VARITA);
      puf(".s09-puf", VARITA);
      sacudon(VARITA + 0.04, 0.8);
"""
SFX = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 0.1, "sfx": "glitch-1", "vol": 0.22, "max": 0.4}, {"t": 1.45, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.95, "sfx": "sparkle", "vol": 0.25}, {"t": 2.96, "sfx": "click", "vol": 0.4}, {"t": 3.0, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
