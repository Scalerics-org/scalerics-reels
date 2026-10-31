ID = "s13-odia"; DUR = 7.09
CSS = """
    $ .s13-odia { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 140px; line-height: 1; color: #ff3d6e; text-shadow: 0 8px 0 #0b1330; }
    $ .s13-odiaba { position: absolute; left: 0; right: 0; top: 640px; text-align: center; font-family: "Caveat", cursive; font-weight: 700; font-size: 150px; line-height: 1; color: #fff1dc; }
    $ .s13-odiaba s { text-decoration-color: #5ce611; text-decoration-thickness: 10px; }
    $ .s13-l1 { position: absolute; left: 60px; top: 610px; padding: 12px 24px 8px; background: #ffb547; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #0b1330; white-space: nowrap; transform: rotate(-3deg); }
    $ .s13-l2 { position: absolute; left: 520px; top: 720px; padding: 12px 24px 8px; background: #5ce611; border-radius: 12px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #0b1330; white-space: nowrap; transform: rotate(3deg); }
"""
HTML = """
        <div class="s13-uno">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s13-nico"><g transform="translate(-20 900) scale(1.3)">""" + NICO("s13", tarjeta=False) + """
              <g class="s13-mano"><path class="k" d="M300 470 C340 430 330 360 290 330 L268 350 C296 376 300 420 270 446 Z" /><circle class="b" cx="262" cy="314" r="30" /></g>
            </g></g>
            """ + ESCRITORIO("s13", -40, 1440, 640, 280, taza=False) + """
            <g class="s13-emp">
              <circle cx="790" cy="1150" r="220" fill="#0b1330" stroke="#ff3d6e" stroke-width="10" />
              <defs><clipPath id="s13-clip"><circle cx="790" cy="1150" r="214" /></clipPath></defs>
              <g clip-path="url(#s13-clip)"><g transform="translate(574 806) scale(1.2)">""" + EMPLEADO("s13e", True) + """</g></g>
            </g>
          </svg>
          <div class="s13-odia">¿TE ODIA?</div>
        </div>
        <div class="s13-dos">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s13-ag"><g transform="translate(270 820) scale(1.5)">""" + AGENTE("s13") + """</g></g>
          </svg>
          <div class="s13-odiaba">Me odiaba.</div>
        </div>
        <div class="s13-tres">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s13-emp2"><g transform="translate(60 820) scale(1.05)">""" + EMPLEADO("s13f", False) + """</g></g>
            <g class="s13-cli"><g transform="translate(1080 900) scale(-1.05 1.05)">""" + CLIENTA("s13c") + """</g></g>
            <rect class="m" x="-20" y="1300" width="1120" height="220" rx="10" />
            <rect class="y" x="-30" y="1280" width="1140" height="30" rx="10" />
            <path d="M80 1360 H1000 M80 1440 H1000" stroke="#fff1dc" stroke-width="4" opacity="0.2" />
            <g class="s13-cel">
              <rect class="ag" x="470" y="1110" width="140" height="170" rx="22" stroke-width="7" />
              <rect x="500" y="1160" width="20" height="34" rx="10" fill="#5ce611" /><rect x="560" y="1160" width="20" height="34" rx="10" fill="#5ce611" />
              <path class="gl" d="M508 1220 C525 1240 555 1240 572 1220" stroke-width="7" />
            </g>
            <g class="s13-burbujas">
              <rect class="s13-bu" x="440" y="990" width="90" height="56" rx="18" fill="#5ce611" /><path class="s13-bu" d="M460 1018 l12 12 l24 -24" fill="none" stroke="#0b1330" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
              <rect class="s13-bu2" x="560" y="930" width="90" height="56" rx="18" fill="#5ce611" /><path class="s13-bu2" d="M580 958 l12 12 l24 -24" fill="none" stroke="#0b1330" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
              <rect class="s13-bu3" x="470" y="860" width="90" height="56" rx="18" fill="#5ce611" /><path class="s13-bu3" d="M490 888 l12 12 l24 -24" fill="none" stroke="#0b1330" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
          <div class="s13-l1">ÉL: EL MOSTRADOR</div>
          <div class="s13-l2">YO: EL CELULAR</div>
        </div>
"""
JS = """
      const EMPLEADO = 0.80, ODIA = 1.52, ME = 2.50, AHORA = 3.64, TRANQUILO = 4.22, CELULAR = 5.59, YO = 6.31;
      habla(".s13-boca", 0, 1.8, "180 284");
      tl.fromTo(q(".s13-mano"), { rotation: 0, svgOrigin: "300 470" }, { rotation: -10, svgOrigin: "300 470", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.1);
      pop(".s13-emp", EMPLEADO - 0.1, { transformOrigin: "50% 50%" });
      golpe(".s13-odia", ODIA, 2.2);
      sacudon(ODIA + 0.04, 0.9);
      // el agente: "me odiaba"
      tl.set(q(".s13-uno"), { opacity: 0 }, ME - 0.15);
      gsap.set([q(".s13-dos"), q(".s13-tres")], { opacity: 0 });
      tl.set(q(".s13-dos"), { opacity: 1 }, ME - 0.15);
      habla(".s13-ag-boca", ME, 0.6, "180 260");
      tl.fromTo(q(".s13-ag"), { y: 0 }, { y: -16, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ME + 0.1);
      tl.fromTo([q(".s13-ag-bi"), q(".s13-ag-bd")], { scaleY: 1, svgOrigin: "180 372" }, { scaleY: -0.4, svgOrigin: "180 372", duration: 0.2, ease: "back.out(2)", immediateRender: false }, ME + 0.1);
      pop(".s13-odiaba", ME + 0.1, { rotation: -4 });
      // el local: el empleado atiende tranquilo, el agente el celular
      tl.set(q(".s13-dos"), { opacity: 0 }, AHORA - 0.15);
      tl.set(q(".s13-tres"), { opacity: 1 }, AHORA - 0.15);
      tl.fromTo(q(".s13-tres"), { scale: 1.1, transformOrigin: "50% 60%" }, { scale: 1, transformOrigin: "50% 60%", duration: 0.5, ease: "power3.out", immediateRender: false }, AHORA - 0.15);
      habla(".s13f-boca", AHORA + 0.2, 1.6, "180 294");
      habla(".s13c-boca", AHORA + 0.4, 1.2, "180 294");
      golpe(".s13-l1", TRANQUILO, 1.8);
      tl.fromTo(q(".s13-cel"), { scale: 1, transformOrigin: "50% 100%" }, { scale: 1.25, transformOrigin: "50% 100%", duration: 0.2, yoyo: true, repeat: 1, ease: "back.out(2)", immediateRender: false }, CELULAR - 0.1);
      golpe(".s13-l2", CELULAR, 1.8);
      pop(".s13-bu", CELULAR + 0.1, { y: 20 });
      pop(".s13-bu2", CELULAR + 0.35, { y: 20 });
      pop(".s13-bu3", YO, { y: 20 });
"""
SFX = [{"t": 0.7, "sfx": "pop", "vol": 0.28}, {"t": 1.46, "sfx": "glitch-1", "vol": 0.25, "max": 0.5}, {"t": 2.45, "sfx": "whoosh-short", "vol": 0.25}, {"t": 4.16, "sfx": "pop", "vol": 0.3}, {"t": 5.53, "sfx": "pop", "vol": 0.3}, {"t": 5.7, "sfx": "ping", "vol": 0.25}, {"t": 5.95, "sfx": "ping", "vol": 0.22}, {"t": 6.31, "sfx": "ping", "vol": 0.22}]
