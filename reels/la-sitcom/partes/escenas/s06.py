ID = "s06-tranqui"; DUR = 5.83
CSS = """
    $ .s06-lista { position: absolute; left: 330px; top: 560px; width: 420px; padding: 26px 30px 20px; background: #fff4e0; border: 7px solid #24122f; border-radius: 26px; box-shadow: 0 10px 0 #24122f; transform: rotate(-3deg); }
    $ .s06-lista h3 { margin: 0 0 10px; font-family: "Luckiest Guy", sans-serif; font-weight: 400; font-size: 48px; color: #d4581f; }
    $ .s06-it { position: relative; height: 66px; font-family: "Luckiest Guy", sans-serif; font-size: 52px; line-height: 66px; color: #24122f; padding-left: 80px; }
    $ .s06-it svg { position: absolute; left: 0; top: 4px; width: 64px; height: 56px; overflow: visible; }
    $ .s06-zzz { position: absolute; left: 70px; top: 760px; font-family: "Luckiest Guy", sans-serif; font-size: 80px; color: #fff4e0; -webkit-text-stroke: 7px #24122f; paint-order: stroke fill; white-space: nowrap; }
"""
def item(k, txt):
    return f'<div class="s06-it s06-i{k}"><svg viewBox="0 0 64 56"><path class="s06-ck s06-ck{k}" d="M6 28 L24 46 L58 8" fill="none" stroke="#5ce611" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" /></svg>{txt}</div>'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + NOCHE("s06", 0.55) + """
          <g class="s06-du1"><g transform="translate(-10 780) scale(1.1)">""" + DUENO("s06a", "sospecha", brazos="arriba", chancleta=True) + """</g></g>
          <g class="s06-du2"><g transform="translate(-10 780) scale(1.1)">""" + DUENO("s06b", "cansado") + """</g></g>
          """ + SILLON("s06", 380, 1220, 760, 300) + """
          <g class="s06-ag"><g transform="translate(640 830) scale(0.95)">""" + AGENTE("s06", "tranqui", brazo="pulgar") + """</g></g>
        </svg>
        <div class="s06-lista"><h3>ESTA ERA FÁCIL</h3>""" + item(1, "PRECIO") + item(2, "TALLE") + item(3, "PEDIDO") + """</div>
        <div class="s06-zzz">Z z z</div>
"""
JS = """
      const FACIL = 1.18, PRECIO = 2.06, TALLE = 2.36, PEDIDO = 2.82, VOLVE = 3.18, RISAS = 4.14;
      habla(".s06-ag-boca", 0, 4.3, "180 290");
      tl.fromTo(q(".s06-du1"), { x: -30 }, { x: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, 0);
      tl.fromTo(q(".s06a-chancleta"), { rotation: 25, svgOrigin: "304 262" }, { rotation: 0, svgOrigin: "304 262", duration: 0.4, ease: "power2.out", immediateRender: false }, 0.2);
      tl.fromTo(q(".s06-ag-bd"), { rotation: 0, svgOrigin: "290 310" }, { rotation: -10, svgOrigin: "290 310", duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 0.1);
      pop(".s06-lista", FACIL - 0.1);
      [[1, PRECIO], [2, TALLE], [3, PEDIDO]].forEach(([k, t]) => { pop(".s06-i" + k, t - 0.05, { x: -20 }); dibujar(".s06-ck" + k, t, 0.25); });
      // "volvé a dormir": el dueño se desinfla y se va con los zzz
      gsap.set(q(".s06-du2"), { opacity: 0 });
      tl.set(q(".s06-du1"), { opacity: 0 }, VOLVE + 0.2);
      tl.set(q(".s06-du2"), { opacity: 1 }, VOLVE + 0.2);
      tl.fromTo(q(".s06-du2"), { y: 0 }, { y: 70, duration: 1.2, ease: "power2.inOut", immediateRender: false }, VOLVE + 0.25);
      gsap.set(q(".s06-zzz"), { opacity: 0 });
      tl.fromTo(q(".s06-zzz"), { opacity: 0, y: 40, scale: 0.7 }, { opacity: 1, y: -40, scale: 1, duration: 1.2, ease: "power1.out", immediateRender: false }, VOLVE + 0.6);
      // risas grabadas: el agente se ríe
      tl.fromTo(q(".s06-ag"), { y: 0 }, { y: -16, duration: 0.12, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, RISAS);
      zoom(RISAS, 1.05, 0.4, "70%", "60%");
"""
SFX = [{"t": 2.04, "sfx": "click", "vol": 0.3}, {"t": 2.34, "sfx": "click", "vol": 0.3}, {"t": 2.8, "sfx": "click", "vol": 0.3}, {"t": 2.9, "sfx": "chime", "vol": 0.2}]
