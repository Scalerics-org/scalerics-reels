ID = "s12-extendido"; DUR = 5.07
def icono(tipo):
    n = '<path class="b" d="M-70 20 C-100 20 -100 -20 -66 -24 C-66 -64 -12 -68 0 -40 C14 -76 76 -66 70 -24 C104 -24 108 20 74 20 Z" />'
    if tipo == "sol":
        return '<circle cx="0" cy="-10" r="40" fill="#ffd23f" stroke="#f4f6fb" stroke-width="6" /><path d="M0 -76 V-62 M0 42 V56 M-66 -10 H-52 M52 -10 H66 M-46 -56 L-36 -46 M36 26 L46 36 M46 -56 L36 -46 M-36 26 L-46 36" stroke="#ffd23f" stroke-width="7" stroke-linecap="round" />'
    if tipo == "nube":
        return n
    if tipo == "lluvia":
        return n + '<path d="M-40 40 l-10 26 M0 40 l-10 26 M40 40 l-10 26" stroke="#5ec8ff" stroke-width="8" stroke-linecap="round" />'
    return n + '<path d="M-6 26 L-26 64 L2 64 L-16 100" fill="none" stroke="#ffd23f" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" /><path d="M-56 34 l-10 24 M44 34 l-10 24" stroke="#5ec8ff" stroke-width="8" stroke-linecap="round" />'
DIAS = [("LUN", "nube", "18°"), ("MAR", "lluvia", "16°"), ("MIÉ", "tormenta", "14°"), ("FIN DE MES", "tormenta", "¡UF!")]
CSS = """
    $ .s12-panel { position: absolute; left: 50px; top: 580px; width: 980px; height: 380px; background: #0b2547; border: 6px solid #f4f6fb; border-radius: 26px; }
    $ .s12-dia { position: absolute; top: 24px; width: 220px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 30px; color: #f4f6fb; white-space: nowrap; }
    $ .s12-temp { position: absolute; top: 300px; width: 220px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 44px; color: #5ec8ff; }
    $ .s12-fm { color: #ff8a1f; }
    $ .s12-st { position: absolute; left: 90px; top: 1040px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1.05; color: #f4f6fb; }
    $ .s12-st small { display: block; margin-top: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.2em; color: #5ec8ff; }
    $ .s12-enojado { left: 80px; top: 1250px; background: #ff8a1f; color: #061428; font-size: 46px; box-shadow: 8px 8px 0 #061428; transform: rotate(-4deg); }
"""
cols = ""
celdas = ""
for i, (d, t, g) in enumerate(DIAS):
    x = 20 + i * 240
    cols += f'<div class="s12-dia {"s12-fm" if i == 3 else ""}" style="left:{x}px">{d}</div><div class="s12-temp {"s12-fm" if i == 3 else ""}" style="left:{x}px">{g}</div>'
    celdas += f'<g class="s12-ic s12-ic{i}"><g transform="translate({50 + x + 110} {580 + 180})">{icono(t)}</g></g>'
HTML = """
        <div class="s12-panel">""" + cols + """</div>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <rect class="s12-marco" x="800" y="596" width="214" height="348" rx="20" fill="none" stroke="#ff8a1f" stroke-width="7" />
          """ + celdas + """
          <g class="s12-termo"><g transform="translate(270 0)">
            <rect x="490" y="990" width="100" height="320" rx="50" fill="#0b2547" stroke="#f4f6fb" stroke-width="7" />
            <rect class="s12-merc" x="515" y="1010" width="50" height="300" rx="25" fill="#ff8a1f" />
            <path d="M600 1040 h24 M600 1100 h16 M600 1160 h24 M600 1220 h16" stroke="#f4f6fb" stroke-width="5" stroke-linecap="round" />
            <circle cx="540" cy="1320" r="72" fill="#ff8a1f" stroke="#f4f6fb" stroke-width="7" />
            <g class="s12-cara">
              <path d="M500 1296 L528 1308 M580 1296 L552 1308" stroke="#061428" stroke-width="8" stroke-linecap="round" />
              <circle cx="516" cy="1318" r="7" fill="#061428" /><circle cx="564" cy="1318" r="7" fill="#061428" />
              <path d="M514 1356 C526 1340 554 1340 566 1356" fill="none" stroke="#061428" stroke-width="8" stroke-linecap="round" />
            </g>
            <path class="s12-vapor" d="M500 990 C480 960 520 940 500 910 M580 990 C600 960 560 940 580 910" fill="none" stroke="#f4f6fb" stroke-width="6" stroke-linecap="round" />
          </g></g>
        </svg>
        <div class="s12-st">SENSACIÓN<br>TÉRMICA<small>DOMINGO 23 HS</small></div>
        <div class="cartela s12-enojado">CLIENTE ENOJADO</div>
"""
JS = """
      const MAS = 0.98, SENSACION = 2.04, CLIENTE = 3.44, ENOJADO = 3.84;
      tl.fromTo(q(".s12-panel"), { y: -40, opacity: 0.7 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      qa(".s12-ic").forEach((g, i) => { gsap.set(g, { opacity: 0 }); tl.fromTo(g, { opacity: 1, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)", immediateRender: false }, 0.05 + i * 0.12); });
      dibujar(".s12-marco", 0.45, 0.4);
      // más lluvia: fin de mes crece y tiembla
      tl.to(q(".s12-ic3"), { scale: 1.35, svgOrigin: "960 760", duration: 0.25, ease: "back.out(2)" }, MAS);
      tl.to(q(".s12-ic3"), { x: 6, duration: 0.05, yoyo: true, repeat: 13, ease: "none" }, MAS + 0.25);
      sacudon(MAS + 0.05, 0.8);
      // sensación térmica
      gsap.set(q(".s12-termo"), { opacity: 0 });
      tl.fromTo(q(".s12-termo"), { opacity: 1, y: 300 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, SENSACION - 0.3);
      tl.fromTo(q(".s12-st"), { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, SENSACION - 0.1);
      tl.fromTo(q(".s12-merc"), { scaleY: 0.05, svgOrigin: "540 1310" }, { scaleY: 1, svgOrigin: "540 1310", duration: 1.3, ease: "power2.in", immediateRender: true }, SENSACION);
      gsap.set(q(".s12-cara"), { opacity: 0 });
      tl.fromTo(q(".s12-cara"), { opacity: 1, scale: 0.3, svgOrigin: "540 1320" }, { opacity: 1, scale: 1, svgOrigin: "540 1320", duration: 0.25, ease: "back.out(3)", immediateRender: false }, CLIENTE);
      tl.to(q(".s12-termo"), { x: 6, duration: 0.04, yoyo: true, repeat: 15, ease: "none" }, CLIENTE);
      dibujar(".s12-vapor", CLIENTE + 0.1, 0.4);
      tl.to(q(".s12-vapor"), { y: -30, opacity: 0, duration: 0.6, ease: "power1.out" }, CLIENTE + 0.6);
      golpe(".s12-enojado", ENOJADO, 2.2);
      sacudon(ENOJADO + 0.05);
"""
SFX = [{"t": 0.05, "sfx": "pop", "vol": 0.25}, {"t": 0.98, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.6}, {"t": 2.04, "sfx": "riser", "vol": 0.25, "max": 1.4}, {"t": 3.44, "sfx": "glitch-1", "vol": 0.2}, {"t": 3.84, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.7}]
