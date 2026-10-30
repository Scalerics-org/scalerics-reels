import sys; sys.path.insert(0, "gen")
from escena import escena

PELEA_SVG = '''<g transform="translate(560 760) scale(0.92)"><g class="PX-robot"></g></g>
          <g transform="translate(40 820) scale(1.08)"><g class="PX-duenio"></g></g>'''

# ---------- s05: gancho al hígado, round 2, otro local ----------
escena("s05-higado", 4.27, r'''
S .s05-otro { top: 600px; font-size: 104px; color: #ffc531; text-shadow: 0 0 36px rgba(255, 197, 49, 0.35); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-pelea">''' + PELEA_SVG.replace("PX", "s05") + '''
            <g transform="translate(380 1200) scale(0.85)"><g class="s05-pum"></g></g>
          </g>
          <g transform="translate(540 860)"><g class="s05-tarjeta"></g></g>
          <g transform="translate(290 1330)"><g class="s05-l1"></g></g>
          <g transform="translate(790 1330)"><g class="s05-l2"></g></g>
        </svg>
        <div class="txt s05-otro">¡Otro local!</div>
''', r'''
      q(".s05-robot").innerHTML = K.enlatado({ pantalla: ["JA JA JA"] });
      q(".s05-duenio").innerHTML = K.duenio({ cara: "guardia" });
      q(".s05-pum").innerHTML = K.estallido("¡AL HÍGADO!", "#ffc531", "#0d0e14", 38);
      q(".s05-tarjeta").innerHTML = K.tarjeta(2);
      q(".s05-l1").innerHTML = K.local("LOCAL 1");
      q(".s05-l2").innerHTML = K.local("LOCAL 2");
      const HIGADO = 0.57, ROUND = 1.64, DUENIO = 2.45, OTRO = 3.27;
      // el gancho al hígado: el guante entra por abajo
      tl.fromTo(q(".s05-pelea"), { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, 0);
      tl.to(q(".s05-robot .k-e-brazoI"), { x: -230, y: 260, duration: 0.14, ease: "power4.in" }, HIGADO - 0.14);
      tl.to(q(".s05-robot .k-e-brazoI"), { x: 0, y: 0, duration: 0.3 }, HIGADO + 0.2);
      tl.to(q(".s05-duenio"), { rotation: 14, x: -30, svgOrigin: "200 590", duration: 0.12, ease: "power3.out" }, HIGADO);
      K.cara(tl, q(".s05-duenio"), "dolor", HIGADO);
      gsap.set(q(".s05-pum"), { opacity: 0 });
      tl.fromTo(q(".s05-pum"), { opacity: 1, scale: 0.3, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.16, ease: "back.out(3)", immediateRender: false }, HIGADO);
      K.sacudir(tl, esc, HIGADO + 0.03, 20);
      tl.to(q(".s05-pelea"), { opacity: 0, y: 120, duration: 0.25, ease: "power2.in" }, ROUND - 0.3);
      // ROUND 2
      gsap.set(q(".s05-tarjeta"), { opacity: 0 });
      tl.fromTo(q(".s05-tarjeta"), { opacity: 1, rotation: 14, scale: 1.6, svgOrigin: "0 0" }, { rotation: 4, scale: 1, svgOrigin: "0 0", duration: 0.28, ease: "back.out(2)", immediateRender: false }, ROUND - 0.1);
      tl.to(q(".s05-tarjeta"), { scale: 0.5, y: -100, svgOrigin: "0 0", duration: 0.3, ease: "power3.inOut" }, DUENIO - 0.3);
      // los locales
      gsap.set([q(".s05-l1"), q(".s05-l2")], { opacity: 0 });
      tl.fromTo(q(".s05-l1"), { opacity: 0, scale: 0.5, svgOrigin: "0 0" }, { opacity: 1, scale: 1, svgOrigin: "0 0", duration: 0.3, ease: "back.out(2)", immediateRender: false }, DUENIO);
      tl.fromTo(q(".s05-l2"), { opacity: 0, y: -500 }, { opacity: 1, y: 0, duration: 0.4, ease: "bounce.out", immediateRender: false }, OTRO - 0.2);
      tl.to(q(".s05-tarjeta"), { opacity: 0, duration: 0.15 }, OTRO - 0.15);
      K.golpe(tl, q(".s05-otro"), OTRO + 0.1);
''', sfx=[(0.45, "golpe", 0.6), (0.48, "impact-bass-2", 0.4, 0.6), (0.6, "uuh", 0.35, 1.2), (1.5, "campana", 0.5), (2.45, "pop", 0.3), (3.15, "impact-bass-1", 0.35, 0.5), (3.3, "sparkle", 0.3)])

# ---------- s06: "no se puede" ----------
escena("s06-no-se-puede", 3.84, r'''
S .s06-no { left: 70px; top: 590px; font-size: 104px; color: #2f6bff; background: #0d0e14; transform: rotate(-5deg); }
S .s06-regla { position: absolute; left: 0; right: 0; top: 1420px; text-align: center; }
S .s06-regla span { display: inline-block; padding: 10px 24px; background: #ffc531; color: #0d0e14; border-radius: 8px; font-size: 36px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(210 1330) scale(0.82)"><g class="s06-l1"></g></g>
          <g transform="translate(870 1330) scale(0.82)"><g class="s06-l2"></g></g>
          <path class="s06-link" d="M330 1180 Q540 1080 750 1180" stroke="#ffc531" stroke-width="8" stroke-dasharray="4 20" stroke-linecap="round" fill="none"/>
          <g transform="translate(400 800) scale(0.56)"><g class="s06-robot"></g></g>
          <g transform="translate(870 1180)"><g class="s06-x"></g></g>
          <g class="s06-corte"><path d="M500 1090 L580 1170 M580 1090 L500 1170" stroke="#e5383b" stroke-width="14" stroke-linecap="round"/></g>
        </svg>
        <div class="sello s06-no">No se puede</div>
        <div class="mono s06-regla"><span>1 LOCAL = 1 SISTEMA</span></div>
''', r'''
      q(".s06-l1").innerHTML = K.local("LOCAL 1");
      q(".s06-l2").innerHTML = K.local("LOCAL 2");
      q(".s06-robot").innerHTML = K.enlatado({ pantalla: ["...", "NO"], tam: 60 });
      q(".s06-x").innerHTML = K.cruz("#e5383b", 70);
      const NO = 0.0, PUEDE = 0.4, LOCAL = 1.6, SISTEMA = 2.56;
      tl.fromTo(q(".s06-robot"), { y: -40 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.set(q(".s06-link"), { strokeDashoffset: 0 }, 0);
      tl.to(q(".s06-link"), { strokeDashoffset: -96, duration: 1.0, ease: "none" }, 0);
      K.golpe(tl, q(".s06-no"), PUEDE, 2.4);
      K.pantalla(tl, q(".s06-robot"), 1, PUEDE);
      K.sacudir(tl, esc, PUEDE + 0.05, 14);
      // corta la conexión entre los locales
      gsap.set(q(".s06-corte"), { opacity: 0 });
      tl.fromTo(q(".s06-corte"), { opacity: 1, scale: 2, svgOrigin: "540 1130" }, { scale: 1, svgOrigin: "540 1130", duration: 0.14, ease: "power4.in", immediateRender: false }, 1.0);
      tl.to(q(".s06-link"), { opacity: 0.2, duration: 0.15 }, 1.1);
      // el local 2 queda afuera
      tl.to(q(".s06-l2"), { opacity: 0.35, duration: 0.2 }, LOCAL);
      gsap.set(q(".s06-x"), { opacity: 0 });
      tl.fromTo(q(".s06-x"), { opacity: 1, scale: 2.4, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.14, ease: "power4.in", immediateRender: false }, LOCAL);
      K.golpe(tl, q(".s06-regla"), SISTEMA, 1.6);
      tl.to(q(".s06-robot .k-e-cabeza"), { rotation: -8, svgOrigin: "250 250", duration: 0.15, yoyo: true, repeat: 3 }, SISTEMA);
''', sfx=[(0.3, "impact-bass-2", 0.45, 0.6), (0.4, "error", 0.25), (0.95, "glitch-1", 0.3, 0.4), (1.55, "impact-bass-1", 0.35, 0.5), (2.5, "beep", 0.25, 0.5)])

# ---------- s07: a la mandíbula, round 3, el cuaderno al lado de la compu ----------
escena("s07-mandibula", 4.78, r'''
S .s07-lado { position: absolute; left: 0; right: 0; top: 1410px; text-align: center; font-size: 34px; color: #ffc531; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s07-pelea">''' + PELEA_SVG.replace("PX", "s07") + '''
            <g transform="translate(270 700) scale(0.8)"><g class="s07-pum"></g></g>
            <g class="s07-estrellas" fill="#ffc531"><circle cx="140" cy="860" r="12"/><circle cx="280" cy="820" r="10"/><circle cx="380" cy="880" r="12"/></g>
          </g>
          <g transform="translate(540 860)"><g class="s07-tarjeta"></g></g>
          <g class="s07-escritorio">
            <path d="M60 1360 H1020" stroke="#f5f1e8" stroke-width="8" stroke-linecap="round"/>
            <g transform="translate(300 1360)"><g class="s07-compu"></g></g>
            <g transform="translate(770 1220) rotate(4)"><g class="s07-cuaderno"></g></g>
            <g class="s07-lapiz"><path d="M640 1150 l90 -90 l20 20 l-90 90 Z" fill="#ffc531" stroke="#0d0e14" stroke-width="4"/><path d="M640 1150 l-8 28 l28 -8 Z" fill="#0d0e14"/></g>
            <path class="s07-flecha" d="M610 1050 Q540 960 470 1010" stroke="#ffc531" stroke-width="8" fill="none" stroke-linecap="round"/>
          </g>
        </svg>
        <div class="mono s07-lado">AL LADO DE LA COMPU</div>
''', r'''
      q(".s07-robot").innerHTML = K.enlatado({ pantalla: ["JA JA JA"] });
      q(".s07-duenio").innerHTML = K.duenio({ cara: "guardia" });
      q(".s07-pum").innerHTML = K.estallido("¡CRAC!", "#e5383b", "#f5f1e8", 60);
      q(".s07-tarjeta").innerHTML = K.tarjeta(3);
      q(".s07-compu").innerHTML = K.compu(["ENLATADO", "CAMPO", "NO EXISTE"]);
      q(".s07-cuaderno").innerHTML = K.cuaderno();
      const MAND = 0.17, ROUND = 1.44, ANOTA = 2.43, CUADERNO = 2.87, LADO = 3.53, COMPU = 4.02;
      // el gancho de abajo a la mandíbula
      tl.to(q(".s07-robot .k-e-brazoI"), { x: -260, y: 120, duration: 0.1, ease: "power2.in" }, 0);
      tl.to(q(".s07-robot .k-e-brazoI"), { y: -60, duration: 0.1, ease: "power4.out" }, MAND);
      tl.to(q(".s07-robot .k-e-brazoI"), { x: 0, y: 0, duration: 0.3 }, MAND + 0.3);
      tl.to(q(".s07-duenio"), { y: -90, rotation: -12, svgOrigin: "200 590", duration: 0.15, ease: "power3.out" }, MAND);
      tl.to(q(".s07-duenio"), { y: 0, rotation: -4, svgOrigin: "200 590", duration: 0.5, ease: "bounce.out" }, MAND + 0.2);
      K.cara(tl, q(".s07-duenio"), "dolor", MAND);
      gsap.set(q(".s07-pum"), { opacity: 0 });
      tl.fromTo(q(".s07-pum"), { opacity: 1, scale: 0.3, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.16, ease: "back.out(3)", immediateRender: false }, MAND);
      tl.to(q(".s07-pum"), { opacity: 0, duration: 0.2 }, MAND + 0.6);
      tl.fromTo(q(".s07-estrellas"), { rotation: 0, svgOrigin: "260 860" }, { rotation: 360, svgOrigin: "260 860", duration: 1.2, ease: "none" }, MAND + 0.2);
      K.sacudir(tl, esc, MAND + 0.03, 20);
      tl.to(q(".s07-pelea"), { opacity: 0, y: 120, duration: 0.25, ease: "power2.in" }, ROUND - 0.3);
      // ROUND 3
      gsap.set(q(".s07-tarjeta"), { opacity: 0 });
      tl.fromTo(q(".s07-tarjeta"), { opacity: 1, rotation: -14, scale: 1.6, svgOrigin: "0 0" }, { rotation: -3, scale: 1, svgOrigin: "0 0", duration: 0.28, ease: "back.out(2)", immediateRender: false }, ROUND - 0.1);
      tl.to(q(".s07-tarjeta"), { opacity: 0, scale: 0.5, y: -200, svgOrigin: "0 0", duration: 0.3, ease: "power3.in" }, ANOTA - 0.35);
      // el escritorio: la compu y el cuaderno al lado
      gsap.set(q(".s07-escritorio"), { opacity: 0 });
      tl.fromTo(q(".s07-escritorio"), { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, ANOTA - 0.15);
      qa(".s07-cuaderno .k-c-r").forEach((r, i) => K.dibujar(tl, r, CUADERNO - 0.2 + i * 0.16, 0.2));
      tl.fromTo(q(".s07-lapiz"), { x: -120, y: -40 }, { x: 160, y: 120, duration: 1.6, ease: "none", immediateRender: false }, CUADERNO - 0.2);
      tl.to(q(".s07-lapiz"), { rotation: 8, svgOrigin: "640 1150", duration: 0.08, yoyo: true, repeat: 19, ease: "none" }, CUADERNO - 0.2);
      K.dibujar(tl, q(".s07-flecha"), LADO, 0.35);
      K.golpe(tl, q(".s07-lado"), LADO + 0.2, 1.6);
      tl.fromTo(q(".s07-compu"), { scale: 1 }, { scale: 1.08, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 1, immediateRender: false }, COMPU);
''', sfx=[(0.08, "golpe", 0.6), (0.12, "impact-bass-2", 0.45, 0.6), (0.3, "uuh", 0.35, 1.0), (1.32, "campana", 0.5), (2.4, "whoosh", 0.25), (2.8, "typing", 0.25, 1.4), (3.5, "pop", 0.3)])

# ---------- s08: "y ahora tengo los dos" ----------
escena("s08-los-dos", 3.88, r'''
S .s08-dos { top: 590px; font-size: 130px; color: #ffc531; text-shadow: 0 0 36px rgba(255, 197, 49, 0.35); }
S .s08-pagado { left: 640px; top: 760px; font-size: 64px; color: #e5383b; transform: rotate(8deg); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(330 860) scale(1.05)"><g class="s08-duenio"></g></g>
          <g transform="translate(190 1080) scale(0.55)"><g class="s08-cuadernoM"><g class="s08-cuaderno"></g></g></g>
          <g transform="translate(890 1180) scale(0.62)"><g class="s08-compu"></g></g>
          <g class="s08-mas"><path d="M540 760 v-0" /></g>
        </svg>
        <div class="txt s08-dos">Los dos</div>
        <div class="sello s08-pagado">Pagado</div>
''', r'''
      q(".s08-duenio").innerHTML = K.duenio({ cara: "dolor" });
      q(".s08-cuaderno").innerHTML = K.cuaderno();
      q(".s08-compu").innerHTML = K.compu(["ENLATADO", "", ""]);
      const SISTEMA = 0.72, CUADERNO = 1.52, Y = 2.05, DOS = 3.03;
      tl.fromTo(q(".s08-duenio"), { y: 20 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      gsap.set(q(".s08-compu"), { opacity: 0 });
      tl.fromTo(q(".s08-compu"), { opacity: 0, y: -300, svgOrigin: "0 0" }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, SISTEMA - 0.2);
      K.golpe(tl, q(".s08-pagado"), SISTEMA + 0.15, 2.2);
      // "dejar el cuaderno": el cuaderno sale volando... y vuelve
      tl.to(q(".s08-cuadernoM"), { x: -500, y: -600, duration: 0.4, ease: "power2.in" }, CUADERNO - 0.2);
      tl.to(q(".s08-cuaderno"), { rotation: -200, svgOrigin: "0 0", duration: 0.4, ease: "power2.in" }, CUADERNO - 0.2);
      tl.to(q(".s08-pagado"), { opacity: 0, duration: 0.15 }, CUADERNO);
      tl.to(q(".s08-cuadernoM"), { x: 0, y: 0, duration: 0.4, ease: "power2.out" }, Y);
      tl.to(q(".s08-cuaderno"), { rotation: -360, svgOrigin: "0 0", duration: 0.4, ease: "power2.out" }, Y);
      K.cara(tl, q(".s08-duenio"), "grito", Y + 0.3);
      tl.to(q(".s08-duenio .k-d-cabeza"), { rotation: 6, svgOrigin: "200 200", duration: 0.1, yoyo: true, repeat: 7 }, Y + 0.3);
      K.golpe(tl, q(".s08-dos"), DOS);
      K.sacudir(tl, esc, DOS + 0.05, 16);
      tl.to([q(".s08-cuaderno"), q(".s08-compu")], { scale: 1.12, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 3 }, DOS);
''', sfx=[(0.55, "impact-bass-1", 0.35, 0.5), (0.85, "click", 0.35), (1.35, "whoosh", 0.3), (2.05, "whoosh", 0.3), (2.4, "pop", 0.3), (2.95, "impact-bass-2", 0.45, 0.6), (3.1, "uuh", 0.3, 0.9)])
