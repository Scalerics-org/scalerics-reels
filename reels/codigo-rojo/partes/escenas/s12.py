exec(open("partes/escenas/pj.py").read())
ID = "s12-receta"; DUR = 8.89
CSS = """
    $ .s12-rec { position: absolute; left: 200px; top: 480px; width: 680px; height: 700px; background: #eef6f5; border-radius: 16px; border-top: 26px solid #4fc3b0; box-shadow: 12px 12px 0 #03171b; }
    $ .s12-rec .s12-h { position: absolute; left: 40px; top: 28px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.18em; color: #0b2e35; }
    $ .s12-rp { position: absolute; left: 40px; top: 110px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 92px; color: #4fc3b0; }
    $ .s12-med { position: absolute; left: 40px; top: 260px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 84px; line-height: 1; color: #2f9e0a; white-space: nowrap; }
    $ .s12-ind { position: absolute; left: 40px; top: 380px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: #0b2e35; line-height: 1.5; }
    $ .s12-firma { position: absolute; left: 340px; top: 600px; width: 300px; border-top: 4px solid #0b2e35; padding-top: 8px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #0b2e35; }
    $ .s12-b { position: absolute; padding: 14px 24px 12px; border-radius: 26px; background: #0b2e35; border: 5px solid #5ce611; color: #eef6f5; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; white-space: nowrap; }
    $ .s12-b small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.1em; color: #5ce611; margin-bottom: 4px; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-ag"><g transform="translate(540 960) scale(0.82) translate(-540 -940)">
            <circle class="s12-halo" cx="540" cy="940" r="300" fill="#5ce611" opacity="0.1" />
            {agente("s12")}
          </g></g>
        </svg>
        <div class="s12-rec">
          <div class="s12-h">GUARDIA · RECETA</div>
          <div class="s12-rp">Rp/</div>
          <div class="s12-med">AGENTE DE IA</div>
                    <div class="s12-firma">LA DOCTORA</div>
        </div>
        <div class="s12-b s12-b1" style="left: 50px; top: 560px">Al instante</div>
        <div class="s12-b s12-b2" style="left: 700px; top: 540px"><small>03:12</small>¡Hola! Sí</div>
        <div class="s12-b s12-b3" style="left: 40px; top: 800px">Precio: al toque</div>
        <div class="s12-b s12-b4" style="left: 770px; top: 790px">Hay stock</div>
        <div class="s12-b s12-b5" style="left: 40px; top: 1040px">Horario: 9 a 20</div>
        <div class="s12-b s12-b6" style="left: 740px; top: 1030px">Turno agendado</div>
        <div class="s12-b s12-b7" style="left: 385px; top: 1270px"><small>AL QUE NO COMPRÓ</small>¿Te lo guardo?</div>
"""
JS = """
      const RECETA = 0.0, AGENTE = 0.92, ATIENDE = 2.01, INST = 2.77, HORA = 3.52, PREC = 4.44, STOCK = 5.09, HOR = 5.74, AGENDA = 6.41, PREG = 7.40, NOCOMPRO = 7.96;
      tl.fromTo(q(".s12-rec"), { y: 160, rotation: 6, opacity: 0.4 }, { y: 0, rotation: -2, opacity: 1, duration: 0.3, ease: "back.out(1.5)" }, 0);
      pop(".s12-rp", 0.1, { transformOrigin: "0% 50%" });
      gsap.set(q(".s12-med"), { opacity: 0 });
      tl.fromTo(q(".s12-med"), { opacity: 1, clipPath: "inset(0 100% 0 0)" }, { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power1.inOut", immediateRender: false }, AGENTE);
      pop(".s12-firma", AGENTE + 0.7);
      tl.to(q(".s12-rec"), { x: -1400, rotation: -18, opacity: 0, duration: 0.4, ease: "power3.in" }, ATIENDE - 0.15);
      gsap.set(q(".s12-ag"), { opacity: 0 });
      tl.fromTo(q(".s12-ag"), { opacity: 1, scale: 0.4, svgOrigin: "540 960" }, { opacity: 1, scale: 1, svgOrigin: "540 960", duration: 0.4, ease: "back.out(1.8)", immediateRender: false }, ATIENDE);
      tl.fromTo(q(".s12-halo"), { scale: 0.7, svgOrigin: "540 940" }, { scale: 1.15, svgOrigin: "540 940", duration: 0.5, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, ATIENDE);
      tl.to(q(".s12-aojos"), { scaleY: 0.15, svgOrigin: "540 880", duration: 0.06, yoyo: true, repeat: 1 }, 4.0);
      tl.to(q(".s12-aojos"), { scaleY: 0.15, svgOrigin: "540 880", duration: 0.06, yoyo: true, repeat: 1 }, 6.9);
      [[".s12-b1", INST], [".s12-b2", HORA], [".s12-b3", PREC], [".s12-b4", STOCK], [".s12-b5", HOR], [".s12-b6", AGENDA], [".s12-b7", PREG]].forEach(([s, t]) => {
        pop(s, t - 0.05);
        tl.to(q(s), { y: -14, duration: 0.6, yoyo: true, repeat: Math.max(1, Math.floor((DUR - t - 0.3) / 0.6)), ease: "sine.inOut" }, t + 0.3);
      });
      tl.fromTo(q(".s12-b7"), { scale: 1 }, { scale: 1.1, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }, NOCOMPRO);
"""
SFX = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.2}, {"t": 0.92, "sfx": "typing", "vol": 0.25, "max": 0.5}, {"t": 1.9, "sfx": "whoosh", "vol": 0.22}, {"t": 2.05, "sfx": "sparkle", "vol": 0.25}, {"t": 2.72, "sfx": "notification", "vol": 0.22}, {"t": 4.39, "sfx": "ping", "vol": 0.2}, {"t": 6.36, "sfx": "chime", "vol": 0.22}, {"t": 7.35, "sfx": "notification", "vol": 0.22}]
