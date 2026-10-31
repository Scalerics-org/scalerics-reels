ID = "s15-cta"; DUR = 11.18
CSS = """
    $ .s15-rev { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.34em; color: #5ce611; text-transform: uppercase; }
    $ .s15-lab { position: absolute; width: 300px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.16em; color: #e6e8f0; text-transform: uppercase; }
    $ .s15-auto { position: absolute; left: 0; right: 0; top: 1360px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 76px; color: #5ce611; text-transform: uppercase; line-height: 1; }
    $ .s15-marca { position: absolute; left: 0; right: 0; top: 640px; text-align: center; }
    $ .s15-marca img { height: 120px; width: auto; }
    $ .s15-marca div { margin-top: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.3em; color: #5ce611; }
    $ .s15-cta { position: absolute; left: 60px; right: 60px; top: 840px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 96px; line-height: 1.0; color: #e6e8f0; text-transform: uppercase; }
    $ .s15-cta i { font-style: normal; color: #ff4fa3; text-shadow: 0 0 30px rgba(255, 79, 163, 0.55); }
    $ .s15-com { position: absolute; left: 0; right: 0; top: 1240px; text-align: center; }
    $ .s15-com span { display: inline-block; padding: 14px 28px 12px; border-radius: 40px; background: #5ce611; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; color: #0a0610; }
"""
NODOS = [(270, 860), (810, 860), (810, 1200), (270, 1200)]
ICONOS = [
    '<path class="gl" d="M-40 -30 H40 V20 H-10 L-30 40 V20 H-40 Z" stroke-width="7" />',
    '<path class="gl" d="M-42 -34 H42 V34 H-42 Z M-42 -10 H42 M-42 12 H42 M-12 -34 V34" stroke-width="6" />',
    '<path class="gl" d="M-30 20 V-6 C-30 -30 30 -30 30 -6 V20 L40 30 H-40 Z M-8 38 H8" stroke-width="7" />',
    '<path class="gl" d="M-36 34 V0 M-12 34 V-20 M12 34 V-6 M36 34 V-34" stroke-width="12" />',
]
nodos = "".join(f'<g class="s15-n s15-n{i}" transform="translate({x} {y})"><circle r="88" fill="#0a0610" stroke="#5ce611" stroke-width="7" />{ICONOS[i]}</g>' for i, (x, y) in enumerate(NODOS))
labels = "".join(f'<div class="s15-lab s15-l{i}" style="left:{x - 150}px;top:{y + 100}px">{t}</div>' for i, ((x, y), t) in enumerate(zip(NODOS, ["Pedido", "Planilla", "Aviso", "Reporte"])))
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s15-flujo">
            <path class="gl s15-c0" d="M370 860 H710" stroke-width="8" />
            <path class="gl s15-c1" d="M810 960 V1100" stroke-width="8" />
            <path class="gl s15-c2" d="M710 1200 H370" stroke-width="8" />
            """ + nodos + """
          </g>
          <g class="s15-fin">""" + GALERA("s15", "s15-gal", 540, 1460, 0.55) + """
            """ + DESTELLOS("s15", "s15-d", [(400, 1420, 26), (690, 1400, 30), (540, 1350, 20), (330, 1520, 16), (760, 1530, 18)], "#ff4fa3") + """
          </g>
        </svg>
        <div class="s15-rev">El truco, revelado</div>
        """ + labels + """
        <div class="s15-auto">Automatizaciones</div>
        <div class="s15-marca"><img src="assets/logo-blanco.png" alt="Scalerics" /><div>LO HACEMOS NOSOTROS</div></div>
        <div class="s15-cta">¿Qué tarea querés hacer <i>desaparecer?</i></div>
        <div class="s15-com"><span>Contanos en los comentarios</span></div>
"""
JS = """
      const SI = 0.45, AUTO = 1.0, TAREAS = 1.63, REPETIDAS = 2.0, NEGOCIO = 2.72, LO = 3.53, SCALERICS = 4.0, CONTANOS = 4.9, COMENT = 5.54, TAREA = 6.36, DESAP = 7.18;
      // el truco revelado: el circuito que hace todo solo
      tl.fromTo(q(".s15-rev"), { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0);
      [0, 1, 2, 3].forEach((i) => { pop(".s15-n" + i, [0.05, AUTO, TAREAS, REPETIDAS][i]); pop(".s15-l" + i, [0.15, AUTO + 0.1, TAREAS + 0.1, REPETIDAS + 0.1][i]); });
      dibujar(".s15-c0", AUTO - 0.2, 0.3); dibujar(".s15-c1", TAREAS - 0.2, 0.3); dibujar(".s15-c2", REPETIDAS - 0.2, 0.3);
      golpe(".s15-auto", NEGOCIO - 0.3, 2.0);
      tl.to(qa(".s15-n"), { scale: 1.1, transformOrigin: "50% 50%", duration: 0.15, yoyo: true, repeat: 1, stagger: 0.1 }, NEGOCIO);
      // Scalerics
      tl.to([q(".s15-flujo"), q(".s15-rev"), q(".s15-auto"), ...qa(".s15-lab")], { opacity: 0, y: -40, duration: 0.3, ease: "power2.in" }, LO - 0.3);
      pop(".s15-marca", SCALERICS - 0.4);
      // el cierre: la pregunta
      tl.to(q(".s15-marca"), { opacity: 0, y: -30, duration: 0.25 }, CONTANOS - 0.3);
      pop(".s15-cta", CONTANOS - 0.05);
      pop(".s15-com", COMENT);
      gsap.set(q(".s15-fin"), { opacity: 0 });
      tl.fromTo(q(".s15-fin"), { opacity: 0, y: 200 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)", immediateRender: false }, TAREA - 0.2);
      destello(".s15-d path", DESAP - 0.1, 4);
      tl.to(q(".s15-cta i"), { scale: 1.06, duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut" }, DESAP);
      tl.to(q(".s15-com"), { y: -10, duration: 0.4, yoyo: true, repeat: 5, ease: "sine.inOut" }, DESAP + 0.3);
      tl.to(q(".s15-gal"), { rotation: 4, svgOrigin: "540 1600", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, DESAP);
"""
SFX = [{"t": 0.05, "sfx": "chime", "vol": 0.25, "max": 1.0}, {"t": 1.0, "sfx": "pop", "vol": 0.25}, {"t": 1.63, "sfx": "pop", "vol": 0.25}, {"t": 2.0, "sfx": "pop", "vol": 0.25}, {"t": 2.45, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 3.6, "sfx": "sparkle", "vol": 0.3}, {"t": 4.85, "sfx": "whoosh", "vol": 0.25}, {"t": 7.1, "sfx": "sparkle", "vol": 0.3}]
