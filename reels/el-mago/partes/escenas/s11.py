ID = "s11-tada"; DUR = 3.91
CSS = """
    $ .s11-tada { position: absolute; left: 0; right: 0; top: 760px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 210px; line-height: 1; color: #5ce611; text-shadow: 0 0 40px rgba(92, 230, 17, 0.55); }
    $ .s11-msg { position: absolute; left: 70px; top: 610px; width: 560px; padding: 14px 20px 12px; background: #e6e8f0; border-radius: 22px; border-bottom-left-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; line-height: 1.15; color: #0a0610; }
    $ .s11-msg small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; color: #2b1250; }
    $ .s11-plan { position: absolute; left: 70px; top: 860px; width: 940px; border: 6px solid #e6e8f0; border-radius: 12px; background: #e6e8f0; overflow: hidden; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; color: #0a0610; }
    $ .s11-plan .f { display: flex; border-top: 4px solid #0a0610; position: relative; }
    $ .s11-plan .f span { padding: 12px 14px 10px; border-left: 4px solid #0a0610; white-space: nowrap; }
    $ .s11-plan .f span:first-child { border-left: 0; width: 360px; } $ .s11-plan .f span:nth-child(2) { width: 330px; } $ .s11-plan .f span:nth-child(3) { flex: 1; }
    $ .s11-plan .h { background: #45dcf0; border-top: 0; }
    $ .s11-plan .tit { padding: 8px 14px; background: #2b1250; color: #e6e8f0; font-size: 24px; letter-spacing: 0.2em; }
    $ .s11-plan .nueva { background: #5ce611; }
    $ .s11-aviso { position: absolute; left: 470px; top: 1190px; width: 480px; padding: 14px 20px 12px; background: #5ce611; border-radius: 22px; border-bottom-right-radius: 6px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: #0a0610; }
    $ .s11-aviso small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 22px; color: #0a0610; }
    $ .s11-sello { position: absolute; left: 520px; top: 1340px; padding: 10px 22px 8px; border: 6px solid #5ce611; border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; color: #5ce611; text-transform: uppercase; transform: rotate(-5deg); background: #0a0610; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-asis"><g transform="translate(-30 1100) scale(0.78)">""" + ASISTENTE("s11") + """</g></g>
          <path class="gl s11-ruta" d="M350 720 C380 800 300 840 300 990" stroke-dasharray="1 0" stroke-width="8" />
          <path class="gl s11-check" d="M955 1080 L975 1100 L1005 1066" stroke-width="9" />
          """ + HUMO("s11", "s11-puf", 540, 860, 1.6) + """
          """ + DESTELLOS("s11", "s11-d", [(150, 760, 40), (930, 720, 46), (880, 1060, 30), (220, 1060, 26), (540, 700, 24)], "#5ce611") + """
          """ + DESTELLOS("s11", "s11-d2", [(330, 780, 30), (760, 1040, 34), (980, 860, 22)], "#ff4fa3") + """
        </svg>
        <div class="s11-msg"><small>WHATSAPP · SRA. DE LAS EMPANADAS</small>Doce de carne, para las nueve</div>
        <div class="s11-plan"><div class="tit">PEDIDOS.XLSX</div>
          <div class="f h"><span>CLIENTE</span><span>PEDIDO</span><span>HORA</span></div>
          <div class="f"><span>Rubén</span><span>2 pizzas</span><span>20:30</span></div>
          <div class="f nueva s11-fila"><span>Sra. empanadas</span><span>12 carne</span><span>21:00</span></div>
        </div>
        <div class="s11-aviso"><small>A SRA. DE LAS EMPANADAS</small>Tu pedido está listo</div>
        <div class="s11-sello">Salió solo</div>
        <div class="s11-tada">¡TA-DÁ!</div>
"""
JS = """
      const PEDIDO = 0.83, PASO = 1.0, SOLO = 1.41, PLANILLA = 1.83, AVISO = 2.58, LISTO = 3.0, SALIO = 3.33;
      // ¡TA-DÁ!
      puf(".s11-puf", 0);
      golpe(".s11-tada", 0.08, 2.6);
      sacudon(0.1, 1.4);
      destello(".s11-d path", 0.05, 2);
      destello(".s11-d2 path", 0.15, 2);
      tl.fromTo(q(".s11-asis"), { y: 300 }, { y: 0, duration: 0.3, ease: "back.out(1.6)" }, 0);
      habla(".s11-boca", 0, 3.6, "180 292");
      tl.fromTo(q(".s11-brazo"), { rotation: 0, svgOrigin: "268 420" }, { rotation: -40, svgOrigin: "268 420", duration: 0.2, ease: "back.out(2)", immediateRender: false }, 0.05);
      tl.to(q(".s11-tada"), { opacity: 0, scale: 1.3, duration: 0.25, ease: "power2.in" }, PEDIDO - 0.3);
      // el pedido pasa solo a la planilla
      pop(".s11-msg", PEDIDO - 0.15);
      pop(".s11-plan", PEDIDO - 0.05);
      dibujar(".s11-ruta", PASO, 0.4);
      tl.to(q(".s11-msg"), { y: 330, scale: 0.4, opacity: 0, duration: 0.45, ease: "power2.in" }, SOLO);
      gsap.set(q(".s11-fila"), { opacity: 0 });
      tl.fromTo(q(".s11-fila"), { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PLANILLA - 0.05);
      tl.to(q(".s11-ruta"), { opacity: 0, duration: 0.2 }, PLANILLA);
      dibujar(".s11-check", PLANILLA + 0.1, 0.25);
      // el aviso sale solo
      pop(".s11-aviso", AVISO - 0.1, { x: 120 });
      tl.to(q(".s11-aviso"), { x: 40, y: -20, duration: 0.3, yoyo: true, repeat: 1, ease: "sine.inOut" }, LISTO);
      pop(".s11-sello", SALIO - 0.05, { rotation: -5 });
"""
SFX = [{"t": 0.0, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.8}, {"t": 0.05, "sfx": "sparkle", "vol": 0.35}, {"t": 1.0, "sfx": "whoosh", "vol": 0.25}, {"t": 1.83, "sfx": "ping", "vol": 0.3}, {"t": 2.5, "sfx": "whoosh-short", "vol": 0.25}, {"t": 2.6, "sfx": "notification", "vol": 0.3}, {"t": 3.3, "sfx": "chime", "vol": 0.28, "max": 0.8}]
