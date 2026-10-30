exec(PJ)
ID = "s05-menu"; DUR = 5.95
CSS = """
    $ .s05-menu { left: 90px; top: 600px; font-size: 78px; transform: rotate(-6deg); }
    $ .s05-head { position: absolute; left: 314px; top: 640px; width: 452px; height: 80px; background: #2b2b2b; border-bottom: 4px solid #fbf7ea; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; line-height: 80px; color: #fbf7ea; text-align: center; letter-spacing: 0.1em; }
    $ .s05-costado { left: 610px; top: 1190px; font-size: 52px; background: #ff3b30; color: #fbf7ea; transform: rotate(6deg); }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          {celular("s05", 290, 580, 500, 800, extra='<rect x="314" y="640" width="452" height="710" rx="14" fill="#2b2b2b" opacity="0.6" />')}
          <!-- la foto de la pizarra -->
          <g class="s05-foto">
            <rect x="340" y="880" width="400" height="300" fill="#fbf7ea" stroke="#0c0c0c" stroke-width="5" />
            <rect x="360" y="900" width="360" height="260" fill="#2b2b2b" stroke="#0c0c0c" stroke-width="5" />
            <text x="380" y="950" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#fbf7ea">ASADO .....</text>
            <text x="380" y="1000" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#fbf7ea">CHIVITO ...</text>
            <text x="380" y="1050" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#fbf7ea">MILANESA ..</text>
            <path d="M380 1090 C430 1080 470 1110 520 1092 C560 1080 600 1100 640 1088" stroke="#fbf7ea" stroke-width="4" fill="none" opacity="0.6" />
            <path d="M380 1130 C420 1122 460 1140 500 1128" stroke="#fbf7ea" stroke-width="4" fill="none" opacity="0.6" />
          </g>
          <!-- el dedo adelante -->
          <g class="s05-dedo">
            <path d="M200 1500 C220 1300 300 1120 380 1050 C420 1016 470 1040 462 1090 C450 1170 420 1260 400 1500 Z" fill="#2b2b2b" stroke="#fbf7ea" stroke-width="7" stroke-linejoin="round" />
            <path d="M392 1060 C420 1048 446 1060 444 1092 C430 1110 400 1104 392 1060 Z" fill="#fbf7ea" opacity="0.7" />
          </g>
        </svg>
        <div class="s05-head">MENÚ</div>
        <div class="cartela s05-menu" data-layout-allow-overlap>¿El menú?</div>
        <div class="cartela s05-costado">De costado</div>
"""
JS = """
      const MENU = 0.26, FOTO = 1.31, PIZARRA = 2.0, COSTADO = 3.61, DEDO = 4.53;
      tl.fromTo(q(".s05-cel"), { scale: 0.92, svgOrigin: "540 980", opacity: 0.8 }, { scale: 1, svgOrigin: "540 980", opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      pop(".s05-head", 0.1);
      golpe(".s05-menu", MENU + 0.05, 2.2);
      // la foto se carga de a franjas (página lenta)
      gsap.set(q(".s05-foto"), { opacity: 0 });
      tl.fromTo(q(".s05-foto"), { opacity: 1, clipPath: "inset(0 0 100% 0)" }, { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "steps(5)", immediateRender: false }, FOTO);
      tl.to(q(".s05-foto"), { scale: 1.05, svgOrigin: "540 1030", duration: 0.15, yoyo: true, repeat: 1 }, PIZARRA);
      // de costado: la foto se acuesta
      tl.to(q(".s05-menu"), { opacity: 0, y: -40, duration: 0.2 }, COSTADO - 0.5);
      tl.to(q(".s05-foto"), { rotation: -90, svgOrigin: "540 1030", duration: 0.4, ease: "back.out(1.8)" }, COSTADO - 0.35);
      golpe(".s05-costado", COSTADO, 2.2);
      // y todo el celular se inclina, como Fede
      tl.to(q(".s05-cel"), { rotation: -8, svgOrigin: "540 1380", duration: 0.4, ease: "sine.inOut" }, COSTADO + 0.2);
      // el dedo
      gsap.set(q(".s05-dedo"), { opacity: 0 });
      tl.fromTo(q(".s05-dedo"), { opacity: 1, x: -260, y: 300 }, { opacity: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(1.4)", immediateRender: false }, DEDO - 0.15);
      tl.to(q(".s05-dedo"), { y: 10, x: 6, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, DEDO + 0.25);
      sacudon(DEDO + 0.1, 0.6);
"""
SFX = [{"t": 0.26, "sfx": "pop", "vol": 0.3}, {"t": 1.31, "sfx": "click-soft", "vol": 0.25}, {"t": 3.3, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.61, "sfx": "pop", "vol": 0.28}, {"t": 4.45, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}]
