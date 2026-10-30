exec(open("partes/escenas/pj.py").read())
ID = "s07-caja"; DUR = 7.06
CSS = """
    $ .s07-k { position: absolute; padding: 14px 26px 10px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1; text-transform: uppercase; white-space: nowrap; background: #9fe3ff; color: #03171b; box-shadow: 8px 8px 0 #03171b; }
    $ .s07-mil { left: 0; right: 0; top: 590px; font-size: 140px; color: #9fe3ff; text-shadow: 8px 8px 0 #03171b; }
    $ .s07-et { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; letter-spacing: 0.14em; color: #eef6f5; white-space: nowrap; }
"""
HTML = f"""
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-pac">
            <g transform="translate(210 1170)">{camilla("s07", 660)}</g>
            <g transform="translate(330 680) scale(1.0)">
              <path class="l s07-bi" d="M60 420 C0 380 -20 320 -10 260" stroke-width="20" stroke="#cfe5e2" />
              <path class="l s07-bd" d="M300 420 C360 380 380 320 370 260" stroke-width="20" stroke="#cfe5e2" />
              {duenio("s07")}
            </g>
          </g>
          <!-- caja de proveedor -->
          <g class="s07-i1"><rect class="b" x="70" y="900" width="190" height="150" rx="10" /><path class="l" d="M70 945 H260 M165 900 V945" /><rect x="135" y="890" width="60" height="70" fill="#9fe3ff" opacity="0.6" /></g>
          <!-- mostrador con caja registradora -->
          <g class="s07-i2"><rect class="q" x="790" y="960" width="230" height="110" rx="10" /><rect class="b" x="840" y="880" width="130" height="80" rx="10" /><rect x="860" y="896" width="90" height="30" rx="5" fill="#9fe3ff" /></g>
          <!-- balde y escoba -->
          <g class="s07-i3"><path class="b" d="M880 1200 L900 1330 H1000 L1020 1200 Z" /><path class="l" d="M890 1200 C910 1160 990 1160 1010 1200" stroke-width="6" /><path class="l" d="M1050 1090 L1000 1310" stroke-width="10" /><path class="q" d="M960 1300 L1030 1318 L1016 1362 L946 1344 Z" /></g>

        </svg>
        <div class="s07-k s07-k1" style="left: 70px; top: 470px; transform: rotate(-4deg)">¡Estaba en la caja!</div>
        <div class="txt s07-mil" style="position:absolute">MIL COSAS</div>
        <div class="s07-et s07-e1" style="left: 70px; top: 1066px">PROVEEDORES</div>
        <div class="s07-et s07-e2" style="left: 790px; top: 1086px">MOSTRADOR</div>
        <div class="s07-et s07-e3" style="left: 870px; top: 1372px">LIMPIEZA</div>
"""
JS = """
      const CAJA = 0.43, MIL = 1.82, COSAS = 2.00, PROV = 3.21, MOST = 4.17, LIMP = 5.39;
      tl.fromTo(q(".s07-pac"), { scale: 1.12, svgOrigin: "540 1100" }, { scale: 1, svgOrigin: "540 1100", duration: 0.4, ease: "power3.out" }, 0);
      habla(".s07-uboca", 0.0, 0.8, "180 292");
      habla(".s07-uboca", 1.6, 0.9, "180 292");
      habla(".s07-uboca", 3.1, 3.2, "180 292");
      // brazos que se agitan
      tl.to(q(".s07-bi"), { rotation: 30, svgOrigin: "60 420", duration: 0.18, yoyo: true, repeat: 21, ease: "sine.inOut" }, 0.1);
      tl.to(q(".s07-bd"), { rotation: -30, svgOrigin: "300 420", duration: 0.2, yoyo: true, repeat: 19, ease: "sine.inOut" }, 0.2);
      tl.to(q(".s07-ucejas"), { y: -10, duration: 0.15, yoyo: true, repeat: 7 }, 0.3);
      golpe(".s07-k1", CAJA, 2.2);
      sacudon(CAJA + 0.05, 0.8);
      tl.to(q(".s07-k1"), { opacity: 0, y: -20, duration: 0.2 }, MIL - 0.25);
      golpe(".s07-mil", MIL, 2.4);
      sacudon(COSAS, 1);
      tl.to(q(".s07-mil"), { opacity: 0.3, scale: 0.8, y: -60, duration: 0.3 }, PROV - 0.2);
      const icono = (s, e, t, o) => { pop(s, t, { svgOrigin: o }); pop(e, t + 0.1); tl.to(q(s), { rotation: 6, svgOrigin: o, duration: 0.2, yoyo: true, repeat: Math.floor((DUR - t - 0.6) / 0.2), ease: "sine.inOut" }, t + 0.3); };
      icono(".s07-i1", ".s07-e1", PROV, "165 975");
      icono(".s07-i2", ".s07-e2", MOST, "905 980");
      icono(".s07-i3", ".s07-e3", LIMP, "950 1260");
"""
SFX = [{"t": 0.4, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}, {"t": 1.9, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}, {"t": 3.21, "sfx": "pop", "vol": 0.28}, {"t": 4.17, "sfx": "pop", "vol": 0.28}, {"t": 5.39, "sfx": "pop", "vol": 0.28}]
