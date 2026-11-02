ID = "s09-para-vos"; DUR = 5.05
CSS = """
    $ .s09-para { position: absolute; left: 0; right: 0; top: 560px; text-align: center; font-family: "Luckiest Guy", sans-serif; font-size: 112px; line-height: 1; color: #5ce611; -webkit-text-stroke: 10px #24122f; paint-order: stroke fill; text-shadow: 0 12px 0 #24122f; white-space: nowrap; }
    $ .s09-chat { position: absolute; left: 230px; top: 1230px; width: 420px; padding: 18px 20px 18px 120px; background: #fff4e0; border: 7px solid #24122f; border-radius: 28px; box-shadow: 0 10px 0 #24122f; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; line-height: 1.15; color: #24122f; }
    $ .s09-chat svg { position: absolute; left: 14px; top: 14px; width: 92px; height: 92px; overflow: visible; }
    $ .s09-chat small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; color: #d4581f; margin-top: 6px; letter-spacing: 0.06em; }
    $ .s09-cinco { position: absolute; left: 280px; top: 700px; padding: 14px 26px 8px; background: #24122f; border: 6px solid #5ce611; border-radius: 40px; font-family: "Luckiest Guy", sans-serif; font-size: 52px; color: #5ce611; white-space: nowrap; transform: rotate(-4deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s09-du"><g transform="translate(620 760) scale(1.05)">""" + DUENO("s09", "susto") + """</g></g>
          <g class="s09-ag"><g transform="translate(20 820) scale(1.0)">""" + AGENTE("s09", "serio", brazo="da") + """</g></g>
          <g class="s09-ag2"><g transform="translate(20 820) scale(1.0)">""" + AGENTE("s09b", "guino", brazo="da") + """</g></g>
        </svg>
        <div class="s09-para">¡ESTA ES PARA VOS!</div>
        <div class="s09-chat"><svg viewBox="0 0 200 200" aria-hidden="true">""" + GRACIELA("s09") + """</svg>Graciela: 80 camperas<small>PEDIDO GRANDE</small></div>
        <div class="s09-cinco">LA LLAMÁS EN 5 MIN</div>
"""
JS = """
      const ESTA = 0.36, VOS = 1.0, YA = 1.92, CINCO = 2.91, UUH = 3.68;
      habla(".s09-ag-boca", 0, 1.8, "180 290");
      habla(".s09b-ag-boca", 1.9, 1.7, "180 290");
      // "no, no": el agente niega con la cabeza
      tl.fromTo(q(".s09-ag"), { rotation: -4, svgOrigin: "200 1300" }, { rotation: 4, svgOrigin: "200 1300", duration: 0.12, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0);
      golpe(".s09-para", ESTA, 2.4); sacudon(ESTA + 0.04, 0.8);
      // la conversación pasa de la mano del agente al dueño
      gsap.set(q(".s09-chat"), { opacity: 0 });
      tl.fromTo(q(".s09-chat"), { opacity: 0, x: -200, scale: 0.6, rotation: -8 }, { opacity: 1, x: -200, scale: 1, rotation: -8, duration: 0.25, ease: "back.out(2)", immediateRender: false }, VOS - 0.3);
      tl.to(q(".s09-chat"), { x: 160, rotation: 4, duration: 0.5, ease: "power3.inOut" }, VOS + 0.1);
      tl.fromTo(q(".s09-du"), { x: 0 }, { x: 12, duration: 0.06, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, VOS + 0.55);
      gsap.set(q(".s09-ag2"), { opacity: 0 });
      tl.set(q(".s09-ag"), { opacity: 0 }, YA - 0.1);
      tl.set(q(".s09-ag2"), { opacity: 1 }, YA - 0.1);
      pop(".s09-cinco", CINCO);
      tl.to(q(".s09-para"), { y: -10, scale: 0.85, duration: 0.3 }, YA);
      // "uuuh" del público: punch-in al dueño
      zoom(UUH, 1.1, 0.35, "75%", "60%");
"""
SFX = [{"t": 0.33, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.05, "sfx": "whoosh", "vol": 0.25}, {"t": 2.9, "sfx": "ping", "vol": 0.3}]
