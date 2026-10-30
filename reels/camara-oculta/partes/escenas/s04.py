exec(PJ)
ID = "s04-musica"; DUR = 4.94
cabezas = ""
for i, (x, y, lado) in enumerate([(110, 960, -1), (210, 1180, -1), (970, 950, 1), (880, 1190, 1)]):
    px = -14 * lado
    cabezas += f'''<g class="s04-cab s04-cab{i}"><circle class="b" cx="{x}" cy="{y}" r="74" />
      <circle cx="{x - 22}" cy="{y - 8}" r="15" fill="#fbf7ea" /><circle cx="{x + 22}" cy="{y - 8}" r="15" fill="#fbf7ea" />
      <circle cx="{x - 22 + px * 0.5}" cy="{y - 6}" r="7" fill="#0c0c0c" /><circle cx="{x + 22 + px * 0.5}" cy="{y - 6}" r="7" fill="#0c0c0c" />
      <path class="l" d="M{x - 30} {y - 36} L{x - 8} {y - 30} M{x + 8} {y - 30} L{x + 30} {y - 36}" stroke-width="5" /></g>'''
NP = [(700, 900, 1.2), (380, 840, 1.0), (820, 1080, 0.9), (300, 1040, 1.1), (620, 760, 0.9), (460, 700, 1.2)]
notas = "".join(nota("s04", f"s04-n{i}", x, y, sc) for i, (x, y, sc) in enumerate(NP))
CSS = """
    $ .s04-uy { left: 80px; top: 600px; font-size: 110px; background: #ff3b30; color: #fbf7ea; transform: rotate(-8deg); }
    $ .s04-parada { left: 390px; top: 610px; font-size: 56px; transform: rotate(5deg); }
    $ .s04-vol { position: absolute; left: 700px; top: 1235px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #0c0c0c; background: #ffd400; padding: 6px 12px; white-space: nowrap; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {cabezas}
          <g class="s04-ondas"><path class="yl" d="M660 1150 C700 1120 700 1080 660 1050 M690 1180 C760 1130 760 1060 690 1010 M720 1210 C820 1140 820 1040 720 970" stroke-width="8" /></g>
          {fede("s04", 540, 1430, 1.15, "o")}
          {notas}
        </svg>
        <div class="cartela s04-uy">¡Uy!</div>
        <div class="cartela s04-parada">¡En la parada!</div>
        <div class="s04-vol">VOLUMEN: MÁXIMO</div>
"""
JS = "      const NP = " + str([[x, y] for x, y, _ in NP]) + ";\n" + """
      const UY = 0.0, ARRANCO = 0.48, MUSICA = 1.22, PARADA = 2.26, TODA = 3.13, MIRANDO = 3.95;
      // cuadro 0: el susto
      gsap.set(q(".s04-uy"), { opacity: 1 });
      tl.fromTo(q(".s04-uy"), { scale: 1.6 }, { scale: 1, duration: 0.18, ease: "power4.out" }, 0);
      tl.fromTo(q(".s04-fede"), { y: 0 }, { y: -90, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" }, 0.02);
      sacudon(0.05, 1);
      // las notas salen del celular (desde la mano de Fede)
      qa(".s04-nota").forEach((n, i) => {
        gsap.set(n, { opacity: 0 });
        tl.fromTo(n, { opacity: 1, x: 610 - NP[i][0], y: 1250 - NP[i][1], scale: 0.2 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, ARRANCO + i * 0.12);
        tl.to(n, { y: -16, rotation: i % 2 ? 10 : -10, duration: 0.22, yoyo: true, repeat: 7, ease: "sine.inOut" }, ARRANCO + 0.5 + i * 0.12);
      });
      dibujar(".s04-ondas path", ARRANCO, 0.3);
      tl.to(q(".s04-ondas"), { opacity: 0.3, duration: 0.11, yoyo: true, repeat: 15, ease: "steps(1)" }, ARRANCO + 0.3);
      pop(".s04-vol", MUSICA);
      // Fede tapa el celular, desesperado
      tl.to(q(".s04-fede"), { rotation: -5, svgOrigin: "540 1430", duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut" }, MUSICA);
      tl.to(q(".s04-uy"), { opacity: 0, y: -40, duration: 0.18 }, PARADA - 0.2);
      golpe(".s04-parada", PARADA, 2.2);
      // toda la parada lo mira
      [0, 1, 2, 3].forEach((i) => {
        const desde = i < 2 ? -300 : 300;
        gsap.set(q(".s04-cab" + i), { opacity: 0 });
        tl.fromTo(q(".s04-cab" + i), { opacity: 1, x: desde }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, TODA + i * 0.08);
      });
      tl.to(qa(".s04-cab"), { y: -10, duration: 0.15, yoyo: true, repeat: 3, ease: "sine.inOut" }, MIRANDO);
      tl.to(q(".s04-parada"), { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1 }, MIRANDO);
"""
SFX = [{"t": 0.02, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}, {"t": 0.48, "sfx": "musiquita", "vol": 0.5}, {"t": 2.26, "sfx": "pop", "vol": 0.25}, {"t": 3.13, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.95, "sfx": "click", "vol": 0.25}]
