exec(open("partes/escenas/pj.py").read())
ID = "s01-codigo"; DUR = 2.38
CSS = """
    $ .s01-codigo { top: 470px; font-size: 116px; color: #ff3341; text-shadow: 0 0 30px rgba(255, 51, 65, 0.5), 8px 8px 0 #03171b; }
    $ .s01-doc { left: 70px; top: 610px; background: #eef6f5; color: #03171b; transform: rotate(-4deg); box-shadow: 8px 8px 0 #ff3341; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s01-vel" opacity="0.5">
            <path class="l" d="M760 760 H1040 M820 880 H1060 M700 1000 H980 M860 1180 H1060 M780 1300 H1000" stroke-width="6" />
          </g>
          <g class="s01-carro">
            <g transform="translate(760 640) scale(0.9)">
              <rect class="b" x="80" y="500" width="70" height="230" rx="16" /><rect class="b" x="210" y="500" width="70" height="230" rx="16" />
              {paramedico("s01")}
              <path class="l" d="M70 420 C20 470 30 520 120 500 M290 420 C330 480 280 520 170 500" stroke-width="22" />
            </g>
            <g transform="translate(150 1080)">{camilla("s01", 760)}</g>
            <g transform="translate(120 640) scale(0.86)">
              <path class="l s01-brazo" d="M300 420 C360 380 390 330 380 270" stroke-width="18" stroke="#cfe5e2" />
              <rect class="b s01-cel" x="350" y="200" width="70" height="120" rx="14" />
              {duenio("s01")}
            </g>
            <g transform="translate(400 1036)">{sabana(400)}</g>
          </g>
        </svg>
        <div class="txt s01-codigo">CÓDIGO ROJO</div>
        <div class="cartela s01-doc">¡DOCTORA!</div>
"""
JS = """
      const COMERCIO = 0.82, CODIGO = 1.26;
      // cuadro 0: la camilla ya viene entrando a toda velocidad
      tl.fromTo(q(".s01-carro"), { x: 520 }, { x: 0, duration: 0.7, ease: "power3.out" }, 0);
      tl.to(q(".s01-carro"), { x: -30, duration: 0.25, ease: "power2.out" }, 0.7);
      tl.to(q(".s01-carro"), { x: 0, duration: 0.3, ease: "back.out(2)" }, 0.95);
      tl.to(q(".s01-carro"), { y: -6, duration: 0.08, yoyo: true, repeat: 9, ease: "sine.inOut" }, 0);
      qa(".s01-rueda").forEach((r) => tl.to(r, { rotation: -720, transformOrigin: "50% 50%", duration: 1.0, ease: "power3.out" }, 0));
      tl.fromTo(q(".s01-vel"), { x: 0, opacity: 0.6 }, { x: 260, opacity: 0, duration: 0.7, ease: "power2.out" }, 0);
      habla(".s01-pboca", 0, 2.0, "180 290");
      habla(".s01-uboca", 0.9, 1.2, "180 292");
      tl.to(q(".s01-brazo"), { rotation: -20, svgOrigin: "300 420", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.7);
      tl.to(q(".s01-cel"), { rotation: -20, svgOrigin: "300 420", duration: 0.12, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.7);
      pop(".s01-doc", 0.05);
      tl.to(q(".s01-doc"), { opacity: 0, y: -30, duration: 0.15 }, CODIGO - 0.15);
      golpe(".s01-codigo", CODIGO, 2.8);
      sacudon(CODIGO + 0.05, 1.5);
      tl.fromTo(q(".s01-codigo"), { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, CODIGO + 0.3);
"""
SFX = [{"t": 0.0, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.9}, {"t": 0.05, "sfx": "pop", "vol": 0.25}, {"t": 1.18, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.2, "sfx": "glitch-1", "vol": 0.2, "max": 0.4}]
