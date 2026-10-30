exec(open("partes/escenas/pj.py").read())
ID = "s08-despejen"; DUR = 7.14
ONDA = "".join(f'<rect x="{230 + i*18}" y="{-h/2:.0f}" width="9" height="{h:.0f}" rx="4" fill="#0b2e35" />' for i, h in enumerate([20,44,64,30,80,52,26,70,40,90,60,34,74,46,22,58,84,38,66,28,50,76,32,60,42,24,56,70,36,48]))
CSS = """
    $ .s08-carga { position: absolute; left: 290px; top: 470px; width: 500px; }
    $ .s08-carga span { display: block; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.24em; color: #ff3341; }
    $ .s08-barra { margin-top: 12px; height: 40px; border: 6px solid #eef6f5; border-radius: 12px; overflow: hidden; }
    $ .s08-fill { width: 100%; height: 100%; background: #ff3341; transform-origin: 0% 50%; }
    $ .s08-desp { top: 560px; font-size: 128px; color: #eef6f5; text-shadow: 0 0 30px rgba(238, 246, 245, 0.6), 8px 8px 0 #ff3341; }
    $ .s08-nada { top: 450px; font-size: 140px; color: #ff3341; text-shadow: 8px 8px 0 #03171b; }
    $ .s08-dur { position: absolute; left: 760px; top: 760px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 60px; color: #0b2e35; }
    $ .s08-menos { position: absolute; left: 860px; top: 960px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 80px; color: #ff3341; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s08-a">
            <g transform="translate(150 1180)">{camilla("s08", 780)}</g>
            <g class="s08-pac"><g transform="translate(360 700) scale(0.95)">{duenio("s08")}</g></g>
            <g class="s08-pi"><path class="l" d="M-40 1000 C120 1000 200 1100 330 1080" stroke-width="10" /><rect class="r" x="300" y="1010" width="110" height="140" rx="18" /><rect class="w" x="320" y="1150" width="70" height="20" rx="6" /></g>
            <g class="s08-pd"><path class="l" d="M1120 1000 C960 1000 880 1100 750 1080" stroke-width="10" /><rect class="r" x="670" y="1010" width="110" height="140" rx="18" /><rect class="w" x="690" y="1150" width="70" height="20" rx="6" /></g>
            <path class="s08-rayo" d="M540 760 L480 900 L580 900 L500 1080" fill="none" stroke="#eef6f5" stroke-width="14" stroke-linejoin="round" stroke-linecap="round" />
            <path class="s08-rayo2" d="M300 900 L230 980 L300 1000 L240 1090 M780 900 L850 980 L780 1000 L840 1090" fill="none" stroke="#eef6f5" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" />
          </g>
          <g class="s08-audio">
            <rect x="80" y="660" width="920" height="200" rx="44" fill="#eef6f5" />
            <circle cx="170" cy="760" r="54" fill="#4fc3b0" />
            <path d="M152 730 L198 760 L152 790 Z" fill="#eef6f5" />
            <g transform="translate(0 760)">{ONDA}</g>
          </g>
          <g class="s08-cli"><circle cx="760" cy="1010" r="44" fill="#eef6f5" /><path d="M700 1180 C700 1090 820 1090 820 1180 V1260 H700 Z" fill="#eef6f5" /><rect x="710" y="1260" width="34" height="90" rx="10" fill="#eef6f5" /><rect x="776" y="1260" width="34" height="90" rx="10" fill="#eef6f5" /></g>
        </svg>
        <div class="s08-carga"><span>CARGANDO</span><div class="s08-barra"><div class="s08-fill"></div></div></div>
        <div class="txt s08-desp" style="position:absolute">¡DESPEJEN!</div>
        <div class="txt s08-nada" style="position:absolute">NADA</div>
        <div class="s08-dur">4:00</div>
        <div class="s08-menos">-1</div>
"""
JS = """
      const DESP = 1.25, NADA = 2.50, LE = 3.64, AUDIO = 4.10, CUATRO = 4.38, FUE = 5.70, CLIENTE = 5.99;
      tl.fromTo(q(".s08-pi"), { x: -420 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s08-pd"), { x: 420 }, { x: 0, duration: 0.35, ease: "back.out(1.4)" }, 0.05);
      tl.fromTo(q(".s08-carga"), { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.2 }, 0.05);
      tl.fromTo(q(".s08-fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power1.in" }, 0.1);
      tl.to(q(".s08-carga"), { opacity: 0, duration: 0.1 }, DESP - 0.05);
      tl.to(q(".s08-pi"), { x: 60, duration: 0.12, ease: "power3.in" }, DESP - 0.12);
      tl.to(q(".s08-pd"), { x: -60, duration: 0.12, ease: "power3.in" }, DESP - 0.12);
      gsap.set([q(".s08-rayo"), q(".s08-rayo2")], { opacity: 0 });
      tl.to([q(".s08-rayo"), q(".s08-rayo2")], { opacity: 1, duration: 0.02, yoyo: true, repeat: 5 }, DESP);
      tl.fromTo(q(".s08-pac"), { y: 0 }, { y: -90, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, DESP);
      golpe(".s08-desp", DESP, 2.6);
      sacudon(DESP + 0.03, 2);
      tl.to(q(".s08-desp"), { opacity: 0, scale: 0.9, duration: 0.2 }, NADA - 0.2);
      tl.to(q(".s08-uboca"), { scaleY: 0.3, svgOrigin: "180 292", duration: 0.1 }, DESP + 0.3);
      // NADA: todo se apaga
      tl.to(q(".s08-a"), { opacity: 0.25, y: 120, duration: 0.3, ease: "power2.out" }, NADA);
      golpe(".s08-nada", NADA, 2.4);
      tl.to(q(".s08-nada"), { opacity: 0.35, y: -20, duration: 0.3 }, LE - 0.2);
      // el audio de cuatro minutos
      gsap.set(q(".s08-audio"), { opacity: 0 });
      tl.fromTo(q(".s08-audio"), { opacity: 1, scaleX: 0.2, svgOrigin: "80 760" }, { opacity: 1, scaleX: 1, svgOrigin: "80 760", duration: 0.5, ease: "power3.out", immediateRender: false }, AUDIO - 0.2);
      golpe(".s08-dur", CUATRO, 2.2);
      sacudon(CUATRO + 0.05, 0.8);
      tl.to(q(".s08-audio"), { y: -10, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, CUATRO + 0.3);
      tl.to(q(".s08-dur"), { y: -10, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, CUATRO + 0.3);
      // y se le fue otro cliente
      gsap.set(q(".s08-cli"), { opacity: 0 });
      tl.fromTo(q(".s08-cli"), { opacity: 1, x: -200 }, { opacity: 1, x: 150, duration: 0.9, ease: "power1.in", immediateRender: false }, FUE - 0.3);
      tl.to(q(".s08-cli"), { y: -10, duration: 0.1, yoyo: true, repeat: 7 }, FUE - 0.3);
      pop(".s08-menos", CLIENTE);
"""
SFX = [{"t": 0.0, "sfx": "riser", "vol": 0.3, "max": 1.25}, {"t": 1.25, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.26, "sfx": "glitch-3", "vol": 0.3, "max": 0.5}, {"t": 2.45, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 3.95, "sfx": "notification", "vol": 0.25}, {"t": 4.33, "sfx": "click", "vol": 0.3}, {"t": 5.99, "sfx": "pop", "vol": 0.28}]
