import sys; sys.path.insert(0, "gen")
from escena import escena

# ---------- s02: el anunciador presenta los rincones ----------
escena("s02-rincones", 7.39, r'''
S .s02-nombre { top: 590px; font-size: 112px; }
S .s02-rojo { color: #e5383b; text-shadow: 0 0 34px rgba(229, 56, 59, 0.4); }
S .s02-azul { color: #2f6bff; text-shadow: 0 0 34px rgba(47, 107, 255, 0.45); }
S .s02-rot { position: absolute; left: 0; right: 0; text-align: center; top: 716px; font-size: 30px; }
S .s02-rot-r { color: #e5383b; }
S .s02-rot-a { color: #2f6bff; }
S .s02-caja { position: absolute; left: 0; right: 0; top: 708px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 56px; color: #f5f1e8; text-transform: uppercase; white-space: nowrap; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <linearGradient id="s02-luz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f1e8" stop-opacity="0.22"/><stop offset="1" stop-color="#f5f1e8" stop-opacity="0.02"/></linearGradient>
          </defs>
          <path class="s02-luzR" d="M230 0 H330 L520 1420 H10 Z" fill="url(#s02-luz)" />
          <path class="s02-luzA" d="M760 0 H860 L1080 1420 H560 Z" fill="url(#s02-luz)" />
          <g transform="translate(40 840) scale(0.95)"><g class="s02-duenio"></g></g>
          <g transform="translate(640 820) scale(0.82)"><g class="s02-robot"></g></g>
          <g transform="translate(390 1010) scale(0.78)"><g class="s02-anun"></g></g>
        </svg>
        <div class="txt s02-nombre s02-rojo">Tu negocio</div>
        <div class="mono s02-rot s02-rot-r">RINCÓN ROJO</div>
        <div class="txt s02-nombre s02-azul">El enlatado</div>
        <div class="mono s02-rot s02-rot-a" style="top: 786px">RINCÓN AZUL</div>
        <div class="s02-caja">de la caja</div>
''', r'''
      q(".s02-duenio").innerHTML = K.duenio({ cara: "guardia" });
      q(".s02-robot").innerHTML = K.enlatado({ pantalla: ["", "HOLA"] });
      q(".s02-anun").innerHTML = K.anunciador();
      const RINCON1 = 0.5, NEGOCIO = 1.42, OTRO = 2.92, RINCON2 = 3.25, ENLATADO = 5.0, CAJA = 5.84;
      // el anunciador ya está; el micrófono baja del techo
      tl.fromTo(q(".s02-anun"), { y: -40 }, { y: 0, duration: 0.4, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s02-anun .k-a-boca"), { scaleY: 0.5, svgOrigin: "200 224" }, { scaleY: 1.6, svgOrigin: "200 224", duration: 0.16, yoyo: true, repeat: 41, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s02-anun .k-a-cabeza"), { rotation: -4, svgOrigin: "200 260" }, { rotation: 4, svgOrigin: "200 260", duration: 0.6, yoyo: true, repeat: 11, ease: "sine.inOut" }, 0);
      // rincón rojo
      gsap.set([q(".s02-luzR"), q(".s02-luzA"), q(".s02-duenio"), q(".s02-robot")], { opacity: 0 });
      tl.to(q(".s02-luzR"), { opacity: 1, duration: 0.08 }, RINCON1);
      tl.fromTo(q(".s02-duenio"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, RINCON1);
      tl.to(q(".s02-duenio .k-d-brazoD"), { y: -60, duration: 0.2, yoyo: true, repeat: 3, ease: "power2.out" }, NEGOCIO);
      K.golpe(tl, q(".s02-rojo"), NEGOCIO);
      K.pop(tl, q(".s02-rot-r"), NEGOCIO + 0.15);
      K.sacudir(tl, esc, NEGOCIO + 0.05, 10);
      // rincón azul: se apaga el rojo
      tl.to([q(".s02-luzR")], { opacity: 0.25, duration: 0.2 }, OTRO);
      tl.to(q(".s02-duenio"), { opacity: 0.35, duration: 0.2 }, OTRO);
      tl.to([q(".s02-rojo"), q(".s02-rot-r")], { opacity: 0, x: -200, duration: 0.25, ease: "power2.in" }, OTRO);
      tl.to(q(".s02-luzA"), { opacity: 1, duration: 0.08 }, RINCON2);
      tl.fromTo(q(".s02-robot"), { opacity: 0, y: -300 }, { opacity: 1, y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, RINCON2);
      K.pantalla(tl, q(".s02-robot"), 1, RINCON2 + 0.4);
      K.golpe(tl, q(".s02-azul"), ENLATADO);
      K.pop(tl, q(".s02-rot-a"), ENLATADO + 0.2);
      K.sacudir(tl, esc, ENLATADO + 0.05, 14);
      K.golpe(tl, q(".s02-caja"), CAJA, 1.8);
      tl.to(q(".s02-robot .k-e-cajon"), { y: 30, duration: 0.12, yoyo: true, repeat: 3 }, CAJA);
      tl.to(q(".s02-robot .k-e-brazoI"), { y: -40, duration: 0.2, yoyo: true, repeat: 3 }, CAJA);
      tl.to(q(".s02-robot .k-e-brazoD"), { y: -40, duration: 0.2, yoyo: true, repeat: 3 }, CAJA + 0.1);
''', sfx=[(0.0, "whoosh", 0.3), (0.45, "impact-bass-1", 0.3, 0.5), (1.35, "impact-bass-2", 0.4, 0.6), (1.5, "aplausos", 0.35, 1.6), (3.2, "impact-bass-1", 0.3, 0.5), (3.6, "golpe", 0.3), (4.95, "impact-bass-2", 0.45, 0.6), (5.1, "uuh", 0.35, 1.5), (5.8, "click", 0.3)])

# ---------- s03: round 1 ----------
escena("s03-round1", 2.82, r'''
S .s03-rot { position: absolute; left: 0; right: 0; text-align: center; top: 1350px; font-size: 32px; color: #ffc531; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 800)"><g class="s03-tarjeta"></g></g>
          <g transform="translate(150 640) scale(0.6)"><g class="s03-campana"></g></g>
          <g transform="translate(320 1180)"><g class="s03-kilo">
            <path d="M-110 70 H110 L90 120 H-90 Z" fill="#f5f1e8" stroke="#0d0e14" stroke-width="5"/>
            <path d="M0 70 V-20" stroke="#f5f1e8" stroke-width="12"/>
            <path class="s03-plato" d="M-120 -30 Q0 30 120 -30 Z" fill="#ffc531" stroke="#0d0e14" stroke-width="5"/>
            <text x="0" y="104" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#0d0e14">2,5 KG</text>
            <text x="0" y="-60" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="56" fill="#f5f1e8">KILO</text>
          </g></g>
          <g transform="translate(760 1180)"><g class="s03-bulto">
            <path d="M-120 -40 H120 V120 H-120 Z" fill="#c8894a" stroke="#0d0e14" stroke-width="5"/>
            <path d="M-120 -40 L-80 -80 H160 L120 -40 M120 120 L160 80 V-80" fill="#a36d38" stroke="#0d0e14" stroke-width="5"/>
            <path d="M-20 -40 V30 M20 -40 V30" stroke="#f5f1e8" stroke-width="8"/>
            <text x="0" y="90" text-anchor="middle" font-family="IBM Plex Mono" font-weight="500" font-size="30" fill="#0d0e14">X 24</text>
            <text x="20" y="-100" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="56" fill="#f5f1e8">BULTO</text>
          </g></g>
        </svg>
''', r'''
      q(".s03-tarjeta").innerHTML = K.tarjeta(1);
      q(".s03-campana").innerHTML = K.campana();
      const KILO = 1.64, BULTO = 2.05;
      // la tarjeta entra girando
      tl.fromTo(q(".s03-tarjeta"), { opacity: 0.3, rotation: -14, scale: 1.5, svgOrigin: "0 0" }, { opacity: 1, rotation: -4, scale: 1, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)" }, 0);
      tl.to(q(".s03-tarjeta"), { rotation: 3, svgOrigin: "0 0", duration: 1.2, ease: "sine.inOut" }, 0.3);
      tl.fromTo(q(".s03-campana .k-martillo"), { rotation: 0, svgOrigin: "120 -120" }, { rotation: -18, svgOrigin: "120 -120", duration: 0.08, yoyo: true, repeat: 5, ease: "power2.in" }, 0);
      tl.fromTo(q(".s03-campana"), { rotation: -6, svgOrigin: "0 -96" }, { rotation: 6, svgOrigin: "0 -96", duration: 0.1, yoyo: true, repeat: 7, immediateRender: false }, 0.05);
      // la tarjeta sube y aparecen el kilo y el bulto
      tl.to(q(".s03-tarjeta"), { scale: 0.62, y: -110, svgOrigin: "0 0", duration: 0.3, ease: "power3.inOut" }, KILO - 0.35);
      tl.to(q(".s03-campana"), { opacity: 0, duration: 0.2 }, KILO - 0.35);
      gsap.set([q(".s03-kilo"), q(".s03-bulto")], { opacity: 0 });
      tl.fromTo(q(".s03-kilo"), { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, KILO - 0.1);
      tl.fromTo(q(".s03-plato"), { y: -10 }, { y: 10, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, KILO + 0.15);
      tl.fromTo(q(".s03-bulto"), { opacity: 0, y: -260, rotation: 20 }, { opacity: 1, y: 0, rotation: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, BULTO - 0.15);
''', sfx=[(0.0, "campana", 0.55), (0.1, "whoosh", 0.25), (1.55, "pop", 0.3), (2.05, "impact-bass-1", 0.35, 0.5)])

# ---------- s04: "ese campo no existe" ----------
escena("s04-campo", 4.27, r'''
S .s04-form { position: absolute; left: 50px; top: 640px; width: 600px; padding: 26px 30px 30px; background: #0d0e14; border: 5px solid #2f6bff; border-radius: 16px; }
S .s04-tit { font-size: 28px; color: #2f6bff; margin-bottom: 22px; }
S .s04-campo { position: relative; margin-top: 16px; padding: 14px 20px; border: 4px solid rgba(245, 241, 232, 0.4); border-radius: 10px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 40px; color: #f5f1e8; white-space: nowrap; }
S .s04-campo small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; letter-spacing: 0.12em; opacity: 0.6; margin-bottom: 4px; }
S .s04-err { border-color: #e5383b; }
S .s04-error { position: absolute; left: 50px; top: 1090px; width: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; line-height: 1.02; color: #e5383b; text-transform: uppercase; }
S .s04-solo { left: 90px; top: 1290px; font-size: 76px; color: #2f6bff; background: #0d0e14; transform: rotate(-6deg); }
S .s04-uni { position: absolute; left: 0; top: 0; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(640 760) scale(0.84)"><g class="s04-robot"></g></g>
        </svg>
        <div class="s04-form">
          <div class="mono s04-tit">NUEVA VENTA</div>
          <div class="s04-campo"><small>PRODUCTO</small>Yerba suelta</div>
          <div class="s04-campo s04-err"><small>CANTIDAD</small><span class="s04-v1">2,5 kg</span><span class="s04-v2 s04-uni" style="left: 20px; top: 46px; opacity: 0">1 unidad</span></div>
        </div>
        <div class="s04-error">Ese campo<br />no existe</div>
        <div class="sello s04-solo">Solo unidades</div>
''', r'''
      q(".s04-robot").innerHTML = K.enlatado({ pantalla: ["...", "ERROR", "UNIDAD"] });
      const CAMPO = 0.51, EXISTE = 1.28, SOLO = 2.47, UNIDADES = 3.07;
      tl.fromTo(q(".s04-form"), { opacity: 0.4, x: -60 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, 0);
      tl.fromTo(q(".s04-robot"), { x: 80 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      // el campo cantidad parpadea en rojo
      tl.fromTo(q(".s04-err"), { x: 0 }, { x: 14, duration: 0.05, yoyo: true, repeat: 7, ease: "none", immediateRender: false }, CAMPO);
      K.pantalla(tl, q(".s04-robot"), 1, CAMPO);
      tl.to(q(".s04-robot .k-e-ojoI"), { fill: "#e5383b", duration: 0.05 }, CAMPO);
      tl.to(q(".s04-robot .k-e-ojoD"), { fill: "#e5383b", duration: 0.05 }, CAMPO);
      K.golpe(tl, q(".s04-error"), EXISTE, 1.8);
      K.sacudir(tl, esc, EXISTE + 0.05, 12);
      // "solo unidades": el 2,5 kg se tacha y queda 1 unidad
      tl.to(q(".s04-v1"), { opacity: 0, duration: 0.1 }, SOLO);
      tl.to(q(".s04-v2"), { opacity: 1, duration: 0.1 }, SOLO);
      K.pantalla(tl, q(".s04-robot"), 2, SOLO);
      tl.to(q(".s04-error"), { opacity: 0.3, duration: 0.2 }, SOLO);
      K.golpe(tl, q(".s04-solo"), UNIDADES, 2.6);
      K.sacudir(tl, esc, UNIDADES + 0.05, 14);
      tl.to(q(".s04-robot .k-e-cabeza"), { rotation: 8, svgOrigin: "250 250", duration: 0.15, yoyo: true, repeat: 3 }, UNIDADES + 0.1);
''', sfx=[(0.45, "error", 0.3), (0.5, "glitch-1", 0.3, 0.4), (1.25, "impact-bass-1", 0.4, 0.6), (2.45, "key-press", 0.35), (3.0, "impact-bass-2", 0.45, 0.6), (3.1, "beep", 0.25, 0.5)])
