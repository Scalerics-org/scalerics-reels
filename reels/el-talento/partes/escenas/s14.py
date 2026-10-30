ID = "s14-cta"; DUR = 7.67
CSS = """
    $ .s14-arm { position: absolute; left: 90px; top: 930px; width: 900px; padding: 16px 0 12px; text-align: center; background: #5ce611; color: #0b080b; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; }
    $ .s14-et { position: absolute; width: 400px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; line-height: 1; }
    $ .s14-vota { position: absolute; left: 0; right: 0; top: 1440px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 38px; letter-spacing: 0.16em; color: #fff3d6; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s14-ag"><g transform="translate(432 570) scale(0.6)">""" + AGENTE("s14") + """</g></g>
          <g class="s14-pasa"><g transform="translate(290 1180) scale(1.5)">""" + BOTON_DORADO("s14", 0, 0, 70) + """</g></g>
          """ + XROJA("s14", "s14-nopasa", 790, 1180, 0.55) + """
          <g class="s14-flecha"><path d="M540 1500 V1560 M510 1535 L540 1565 L570 1535" fill="none" stroke="#5ce611" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" /></g>
        </svg>
        <div class="s14-arm">LO ARMAMOS EN SCALERICS</div>
        <div class="s14-et s14-e1" style="left:90px;top:1300px;color:#f6c544">PASA</div>
        <div class="s14-et s14-e2" style="left:590px;top:1300px;color:#ff2d3d">NO PASA</div>
        <div class="s14-vota">VOTÁ EN LOS COMENTARIOS</div>
"""
JS = """
      const SCALERICS = 1.26, PASA = 1.62, NO = 2.33, VOTA = 2.91;
      tl.fromTo(q(".s14-ag"), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s14-ag-bd"), { rotation: 0, svgOrigin: "296 300" }, { rotation: -30, svgOrigin: "296 300", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 0.2);
      tl.fromTo(q(".s14-ag"), { y: 0 }, { y: -10, duration: 0.5, yoyo: true, repeat: 12, ease: "sine.inOut", immediateRender: false }, 1.0);
      golpe(".s14-arm", SCALERICS, 1.8);
      pop(".s14-pasa", PASA); pop(".s14-e1", PASA + 0.1);
      pop(".s14-nopasa", NO); pop(".s14-e2", NO + 0.1);
      // laten alternados
      for (let k = 0; k < 8; k++) {
        const t = NO + 0.5 + k * 0.6, s = k % 2 ? ".s14-nopasa" : ".s14-pasa", o = k % 2 ? "790 1180" : "290 1180";
        tl.fromTo(q(s), { scale: 1, svgOrigin: o }, { scale: 1.12, svgOrigin: o, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, t);
      }
      pop(".s14-vota", VOTA);
      gsap.set(q(".s14-flecha"), { opacity: 0 });
      tl.fromTo(q(".s14-flecha"), { opacity: 1, y: 0 }, { opacity: 1, y: 18, duration: 0.35, yoyo: true, repeat: 11, ease: "sine.inOut", immediateRender: false }, VOTA + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "chime", "vol": 0.3, "max": 1.0}, {"t": 1.26, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 1.62, "sfx": "pop", "vol": 0.3}, {"t": 2.33, "sfx": "pop", "vol": 0.3}, {"t": 2.91, "sfx": "click", "vol": 0.28}]
