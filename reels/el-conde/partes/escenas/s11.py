from lib import *
p="s11"
css = '''
    $S .s11-cel { position: absolute; left: 300px; top: 600px; width: 480px; height: 650px; background: #f4ead5; border: 7px solid #12061f; border-radius: 52px; box-shadow: 12px 12px 0 #5ce611; overflow: hidden; }
    $S .s11-barra { position: absolute; left: 0; right: 0; top: 0; height: 96px; background: #12061f; display: flex; align-items: center; justify-content: space-between; padding: 18px 28px 0; }
    $S .s11-nombre { font-family: "Lexend", sans-serif; font-weight: 600; font-size: 28px; color: #f4ead5; }
    $S .s11-abierto { font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 20px; letter-spacing: 0.1em; color: #12061f; background: #5ce611; border-radius: 30px; padding: 6px 14px; }
    $S .s11-foto { position: absolute; left: 28px; right: 28px; top: 120px; height: 270px; background: #3a1766; border: 4px solid #12061f; border-radius: 22px; }
    $S .s11-prod { position: absolute; left: 32px; top: 410px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 32px; color: #12061f; line-height: 1.2; }
    $S .s11-prod small { display: block; font-weight: 400; font-size: 22px; color: #6d5f86; }
    $S .s11-boton { position: absolute; left: 32px; right: 32px; top: 520px; height: 84px; background: #5ce611; border: 5px solid #12061f; border-radius: 22px; text-align: center; line-height: 74px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; color: #12061f; }
    $S .s11-vendido { position: absolute; left: 60px; right: 60px; top: 300px; padding: 18px 0; background: #12061f; border: 5px solid #5ce611; border-radius: 22px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 36px; color: #5ce611; }
    $S .s11-reloj { position: absolute; left: 700px; top: 560px; padding: 10px 20px; background: #12061f; border: 5px solid #5ce611; border-radius: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 40px; color: #5ce611; transform: rotate(6deg); }
'''
html = f'''        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="{p}-cama">
            <rect class="tinta" fill="#23104a" x="640" y="640" width="260" height="220" rx="12" />
            <circle class="tinta" fill="#ffd23f" cx="720" cy="720" r="40" />
            <path class="linea" stroke="#f4ead5" style="stroke:#f4ead5" stroke-width="5" d="M770 640 V860 M640 750 H900" />
            <path class="tinta" fill="#7a4e2d" d="M150 1240 V960 h40 V1240 Z M890 1240 V1060 h40 V1240 Z" />
            <rect class="tinta" fill="#f4ead5" x="170" y="1080" width="740" height="110" rx="20" />
            <path class="tinta" fill="#9ec5ff" d="M380 1080 C420 1000 860 1010 900 1080 V1190 H380 Z" />
            <path class="linea" stroke-width="4" d="M460 1040 V1190 M560 1030 V1190 M660 1030 V1190 M760 1036 V1190" />
            <rect class="tinta" fill="#f4ead5" x="200" y="1030" width="150" height="70" rx="30" />
            <circle class="tinta" fill="#e8c9a0" cx="300" cy="1010" r="48" />
            <path class="tinta" fill="#c8102e" d="M252 1000 Q270 930 350 950 L380 1000 L340 990 Q300 980 252 1000 Z" />
            <circle fill="#12061f" cx="320" cy="1006" r="5" />
            <g class="{p}-colmillos"><path fill="#fff" stroke="#12061f" stroke-width="3" d="M310 1030 l5 14 l5 -14 Z M326 1030 l5 14 l5 -14 Z" /></g>
            <rect class="tinta" fill="#12061f" x="380" y="930" width="56" height="94" rx="10" transform="rotate(-20 408 977)" />
            <rect fill="#5ce611" x="388" y="940" width="40" height="72" rx="4" transform="rotate(-20 408 977)" opacity="0.9" />
            <path class="tinta" fill="#e8c9a0" d="M400 1010 q-30 10 -40 40 l30 10 Z" />
          </g>
          <text class="{p}-zz" x="200" y="900" font-family="Lexend" font-weight="700" font-size="40" fill="#f4ead5">3:00</text>
        </svg>
        <div class="{p}-cel">
          <div class="{p}-barra"><div class="{p}-nombre">tienda.centro</div><div class="{p}-abierto">ABIERTA 24 H</div></div>
          <div class="{p}-foto">
            <svg viewBox="0 0 420 270" style="position:absolute;left:0;top:0;width:100%;height:100%" aria-hidden="true">
              <circle cx="330" cy="70" r="36" fill="#ffd23f" stroke="#12061f" stroke-width="4" />
              <path fill="#c8102e" stroke="#12061f" stroke-width="5" stroke-linejoin="round" d="M130 250 L176 70 L244 70 L290 250 Z" />
              <path fill="#160a24" stroke="#12061f" stroke-width="5" stroke-linejoin="round" d="M130 250 L176 70 L196 70 L180 250 Z M290 250 L244 70 L224 70 L240 250 Z" />
              <path fill="#c8102e" stroke="#12061f" stroke-width="5" stroke-linejoin="round" d="M178 72 L150 30 L200 60 Z M242 72 L270 30 L220 60 Z" />
            </svg>
          </div>
          <div class="{p}-prod">Capa de lana, forro rojo<small>Envío a todo el país</small></div>
          <div class="{p}-boton">Comprar</div>
          <div class="{p}-vendido">¡Vendida!</div>
        </div>
        <div class="{p}-reloj">3:00 AM</div>'''
js = f'''
      const NO = 0.61, VAMP = 1.13, COMPRAN = 2.0, EN = 3.22, TIENDAS = 4.78, SOLAS = 6.0, HORA = 6.52;
      tl.fromTo(q(".{p}-cama"), {{ opacity: 0.5, y: 40 }}, {{ opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }}, 0);
      // se le caen los colmillos: no son vampiros
      tl.to(q(".{p}-colmillos"), {{ y: 240, rotation: 90, svgOrigin: "323 1036", duration: 0.5, ease: "power2.in" }}, VAMP);
      tl.to(q(".{p}-colmillos"), {{ opacity: 0, duration: 0.1 }}, VAMP + 0.5);
      muestra(q(".{p}-e1"), NO);
      pop(q(".{p}-zz"), COMPRAN, 0.4);
      muestra(q(".{p}-e2"), COMPRAN);
      tl.to(q(".{p}-zz"), {{ y: -10, duration: 0.3, yoyo: true, repeat: 2 }}, COMPRAN + 0.3);
      // entra la tienda online a pantalla
      tl.to([q(".{p}-cama"), q(".{p}-zz")], {{ opacity: 0.15, duration: 0.3 }}, EN);
      gsap.set(q(".{p}-cel"), {{ opacity: 0 }});
      tl.fromTo(q(".{p}-cel"), {{ opacity: 0, y: 400, rotation: -6 }}, {{ opacity: 1, y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.3)", immediateRender: false }}, EN + 0.1);
      tl.fromTo(q(".{p}-abierto"), {{ scale: 1 }}, {{ scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, immediateRender: false }}, TIENDAS);
      muestra(q(".{p}-e3"), TIENDAS);
      // vende sola: el botón se aprieta solo
      tl.to(q(".{p}-boton"), {{ scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }}, SOLAS - 0.1);
      pop(q(".{p}-vendido"), SOLAS + 0.15, 0.5);
      pop(q(".{p}-reloj"), HORA, 0.4);
'''
sfx=[{"t":0.05,"sfx":"whoosh","vol":0.2},{"t":1.13,"sfx":"pop","vol":0.25},{"t":1.5,"sfx":"click-soft","vol":0.3},{"t":3.3,"sfx":"whoosh-cinematic","vol":0.25,"max":0.8},{"t":4.78,"sfx":"sparkle","vol":0.3},{"t":5.95,"sfx":"click","vol":0.35},{"t":6.15,"sfx":"moneda","vol":0.35},{"t":6.55,"sfx":"ping","vol":0.25}]
escena("s11-online", 7.55, css, html, js, sfx, ["no son vampiros", "compran de noche", "tienda online"])
