from lib import *
p="s12"
css = '''
    $S .s12-pago { position: absolute; left: 140px; top: 600px; width: 800px; padding: 22px 30px; background: #f4ead5; border: 6px solid #12061f; border-radius: 26px; box-shadow: 10px 10px 0 #5ce611; display: flex; align-items: center; gap: 22px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; color: #12061f; }
    $S .s12-tic { width: 64px; height: 64px; flex: none; }
    $S .s12-envio { position: absolute; top: 760px; height: 82px; padding: 0 30px 0 22px; background: #12061f; border: 5px solid #5ce611; border-radius: 22px; display: flex; align-items: center; gap: 14px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 40px; color: #f4ead5; }
    $S .s12-pago svg { position: static; width: 64px; height: 64px; }
    $S .s12-envio svg { position: static; width: 44px; height: 44px; }
    $S .s12-dac { left: 140px; }
    $S .s12-correo { left: 520px; }
    $S .s12-lbl { position: absolute; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; letter-spacing: 0.2em; color: #f4ead5; }
'''
tic = '<svg class="{c}" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="#5ce611" stroke="#12061f" stroke-width="5" /><path d="M18 33 l9 9 l19 -19" fill="none" stroke="#12061f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>'
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <path class="{p}-ruta" fill="none" stroke="#f4ead5" stroke-width="7" stroke-linecap="round" stroke-dasharray="4 22" d="M170 1190 C330 1190 380 1040 560 1060 C720 1080 760 1160 880 1120" />
          <g class="{p}-centro">
            <path class="tinta" fill="#c8102e" d="M170 1190 C130 1150 130 1100 170 1100 C210 1100 210 1150 170 1190 Z" />
            <circle fill="#f4ead5" cx="170" cy="1132" r="12" />
          </g>
          <g class="{p}-castillo">
            <path class="tinta" fill="#2a1546" d="M790 1180 C830 1120 960 1120 1000 1180 Z" />
            <path class="tinta" fill="#160a24" d="M840 1150 V1040 h30 V1150 Z M920 1150 V1040 h30 V1150 Z M866 1150 V1000 h60 V1150 Z" />
            <path class="tinta" fill="#c8102e" d="M834 1042 L855 1000 L876 1042 Z M914 1042 L935 1000 L956 1042 Z M860 1002 L896 950 L932 1002 Z" />
            <rect fill="#b6ff3b" x="888" y="1030" width="14" height="22" rx="7" />
          </g>
          <g class="{p}-camion">
            <rect class="tinta" fill="#f4ead5" x="-70" y="-70" width="90" height="60" rx="8" />
            <path class="tinta" fill="#5ce611" d="M20 -54 h30 l20 24 v20 h-50 Z" />
            <circle class="tinta" fill="#12061f" cx="-44" cy="-8" r="13" />
            <circle class="tinta" fill="#12061f" cx="44" cy="-8" r="13" />
            <path class="linea" stroke-width="4" d="M-56 -50 h50" />
          </g>
          <circle class="{p}-ping" fill="none" stroke="#5ce611" stroke-width="6" cx="895" cy="1080" r="60" />
        </svg>
        <div class="{p}-lbl" style="left: 110px; top: 1210px;">CENTRO</div>
        <div class="{p}-lbl" style="left: 790px; top: 1196px;">CASTILLO</div>
        <div class="{p}-pago">{tic.format(c=p+"-tic")}<span>Pagado con Mercado Pago</span></div>
        <div class="{p}-envio {p}-dac">{tic.format(c="")}Envío DAC</div>
        <div class="{p}-envio {p}-correo">{tic.format(c="")}Envío Correo</div>'''
js = f'''
      const MP = 0.19, ENVIO = 1.15, DAC = 1.58, CORREO = 2.02, HASTA = 2.81, CAST = 3.15;
      pop(q(".{p}-pago"), 0.0, 0.7);
      tl.fromTo(q(".{p}-tic"), {{ scale: 0, rotation: -90 }}, {{ scale: 1, rotation: 0, duration: 0.35, ease: "back.out(2.5)", immediateRender: false }}, MP + 0.3);
      // la ruta y el camión
      tl.fromTo(q(".{p}-ruta"), {{ opacity: 0 }}, {{ opacity: 0.8, duration: 0.3 }}, 0.1);
      tl.fromTo([q(".{p}-centro"), q(".{p}-castillo")], {{ opacity: 0.3 }}, {{ opacity: 1, duration: 0.3 }}, 0.1);
      pop(q(".{p}-dac"), DAC - 0.05, 0.6);
      pop(q(".{p}-correo"), CORREO - 0.05, 0.6);
      gsap.set(q(".{p}-camion"), {{ x: 170, y: 1190, opacity: 0 }});
      tl.set(q(".{p}-camion"), {{ opacity: 1 }}, ENVIO);
      const pts = [[170, 1190], [330, 1170], [450, 1080], [560, 1060], [700, 1080], [800, 1140], [880, 1120]];
      for (let i = 1; i < pts.length; i++) tl.to(q(".{p}-camion"), {{ x: pts[i][0], y: pts[i][1], duration: (CAST - ENVIO - 0.1) / (pts.length - 1), ease: "none" }}, ENVIO + (i - 1) * (CAST - ENVIO - 0.1) / (pts.length - 1));
      tl.to(q(".{p}-camion"), {{ y: "-=6", duration: 0.08, yoyo: true, repeat: 21, ease: "none" }}, ENVIO);
      gsap.set(q(".{p}-ping"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-ping"), {{ opacity: 1, scale: 0.3, transformOrigin: "50% 50%" }}, {{ opacity: 0, scale: 1.6, transformOrigin: "50% 50%", duration: 0.6, ease: "power2.out", immediateRender: false }}, CAST);
      muestra(q(".{p}-e1"), HASTA);
'''
sfx=[{"t":0.05,"sfx":"pop","vol":0.25},{"t":0.5,"sfx":"moneda","vol":0.3},{"t":1.15,"sfx":"whoosh","vol":0.22},{"t":1.55,"sfx":"click","vol":0.3},{"t":2.0,"sfx":"click","vol":0.3},{"t":3.15,"sfx":"ping","vol":0.35}]
escena("s12-envio", 4.49, css, html, js, sfx, ["hasta tacuarembó"])
