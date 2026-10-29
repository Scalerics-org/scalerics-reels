ID = "s11-agente"; DUR = 2.68
CSS = """
    $ .s11-rev { left: 0; right: 0; margin: 0 auto; width: 420px; text-align: center; top: 580px; background: #e3212d; color: #f4f6fb; font-size: 46px; box-shadow: 8px 8px 0 #050d22; }
    $ .s11-agente { top: 1190px; font-size: 128px; color: #5ce611; text-shadow: 0 0 34px rgba(92, 230, 17, 0.55), 8px 8px 0 #050d22; }
    $ .s11-chat { position: absolute; padding: 10px 18px 8px; border-radius: 18px; background: #0b1d4a; border: 4px solid #5ce611; color: #f4f6fb; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; white-space: nowrap; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <circle class="s11-halo" cx="540" cy="930" r="300" fill="#5ce611" opacity="0.1" />
          <g class="s11-tel">
            <path class="gl" d="M330 860 C330 700 750 700 750 860" stroke-width="16" />
            <rect class="g" x="300" y="840" width="70" height="140" rx="26" />
            <rect class="g" x="710" y="840" width="70" height="140" rx="26" />
            <path class="gl" d="M740 980 C760 1060 700 1090 640 1080" stroke-width="8" />
            <circle cx="636" cy="1080" r="14" fill="#5ce611" />
            <rect x="380" y="700" width="320" height="480" rx="46" fill="#0b1d4a" stroke="#5ce611" stroke-width="9" />
            <rect x="490" y="720" width="100" height="12" rx="6" fill="#5ce611" opacity="0.6" />
            <g class="s11-ojos"><path class="gl" d="M460 880 h50 M570 880 h50" stroke-width="14" /></g>
            <path class="gl" d="M480 960 C520 1000 560 1000 600 960" stroke-width="10" />
          </g>
        </svg>
        <div class="s11-chat s11-c1" style="left: 60px; top: 760px">Pedido tomado</div>
        <div class="s11-chat s11-c2" style="left: 740px; top: 720px">Turno 10:30</div>
        <div class="s11-chat s11-c3" style="left: 50px; top: 1020px">¿Talle G? Sí</div>
        <div class="s11-chat s11-c4" style="left: 760px; top: 1060px">23:01 ✓</div>
        <div class="cartela s11-rev">REVELACIÓN</div>
        <div class="txt s11-agente">AGENTE DE IA</div>
"""
JS = """
      const CONTESTA = 0.15, AGENTE = 1.39, IA = 1.86;
      // cuadro 0: el agente ya aparece del blanco
      tl.fromTo(q(".s11-tel"), { scale: 0.7, opacity: 0.6, svgOrigin: "540 940" }, { scale: 1, opacity: 1, svgOrigin: "540 940", duration: 0.35, ease: "back.out(1.8)" }, 0);
      tl.fromTo(q(".s11-halo"), { scale: 0.6, svgOrigin: "540 930" }, { scale: 1.15, svgOrigin: "540 930", duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0);
      pop(".s11-rev", 0.05);
      // los chats salen solos, uno atrás del otro
      [".s11-c1", ".s11-c2", ".s11-c3", ".s11-c4"].forEach((s, i) => {
        pop(s, CONTESTA + 0.15 + i * 0.22);
        tl.to(q(s), { y: -30, duration: 1.2, ease: "none" }, CONTESTA + 0.45 + i * 0.22);
      });
      tl.fromTo(q(".s11-ojos"), { scaleY: 1, svgOrigin: "540 880" }, { scaleY: 0.15, svgOrigin: "540 880", duration: 0.06, yoyo: true, repeat: 1, immediateRender: false }, 0.9);
      golpe(".s11-agente", AGENTE, 2.6);
      sacudon(AGENTE + 0.05, 1.3);
      tl.fromTo(q(".s11-agente"), { scale: 1 }, { scale: 1.07, duration: 0.14, yoyo: true, repeat: 1, immediateRender: false }, IA);
"""
SFX = [{"t": 0.0, "sfx": "whoosh-cinematic", "vol": 0.25, "max": 0.8}, {"t": 0.3, "sfx": "ping", "vol": 0.22}, {"t": 0.52, "sfx": "ping", "vol": 0.18}, {"t": 0.74, "sfx": "ping", "vol": 0.18}, {"t": 1.3, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.86, "sfx": "sparkle", "vol": 0.25}]
