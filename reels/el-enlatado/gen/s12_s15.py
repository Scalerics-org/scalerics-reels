import sys; sys.path.insert(0, "gen")
from escena import escena

VERDE = 'K.enlatado({ color: "#5ce611", oscuro: "#2e7a08", etiqueta: "A MEDIDA", lata: "#e9ecf2", ojos: "#f5f1e8", amable: true, modelo: "HECHO PARA VOS", pantalla: PANT, tam: 28, colorPantalla: "#5ce611" })'

# ---------- s12: entra Scalerics, el rincón verde, el sistema a medida ----------
escena("s12-esquina", 4.54, r'''
S .s12-rot { position: absolute; left: 0; right: 0; top: 600px; text-align: center; font-size: 34px; color: #5ce611; }
S .s12-medida { left: 560px; top: 680px; font-size: 76px; color: #5ce611; background: #0d0e14; transform: rotate(-6deg); }
S .s12-hecho { position: absolute; left: 0; right: 0; top: 1410px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 52px; color: #f5f1e8; text-transform: uppercase; white-space: nowrap; }
S .s12-hecho b { color: #5ce611; font-weight: 900; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <rect x="980" y="560" width="40" height="780" rx="8" fill="#5ce611"/>
          <g transform="translate(470 740) scale(0.88)"><g class="s12-robotM"><g class="s12-robot"></g></g></g>
          <g transform="translate(20 860) scale(0.95)"><g class="s12-duenio"></g></g>
          <g class="s12-cinta" fill="none" stroke-linecap="round">
            <path class="s12-c1" d="M500 1000 Q700 1080 900 1000" stroke="#ffc531" stroke-width="22"/>
            <path class="s12-c2" d="M500 1000 Q700 1080 900 1000" stroke="#0d0e14" stroke-width="4" stroke-dasharray="3 22"/>
            <path class="s12-c3" d="M520 1180 Q700 1250 880 1180" stroke="#ffc531" stroke-width="22"/>
            <path class="s12-c4" d="M520 1180 Q700 1250 880 1180" stroke="#0d0e14" stroke-width="4" stroke-dasharray="3 22"/>
          </g>
        </svg>
        <div class="mono s12-rot">RINCÓN VERDE · SCALERICS</div>
        <div class="sello s12-medida">A medida</div>
        <div class="s12-hecho">Hecho para <b>tu negocio</b></div>
''', r'''
      const PANT = ["HOLA, SOCIO", "¿CÓMO TRABAJÁS?", "ANOTADO"];
      q(".s12-robot").innerHTML = ''' + VERDE + r''';
      q(".s12-duenio").innerHTML = K.duenio({ cara: "guardia" });
      const SCALERICS = 0.32, SISTEMA = 1.37, MEDIDA = 1.8, HECHO = 2.52, TRABAJA = 3.25, NEGOCIO = 3.68;
      // el sistema a medida cae en el rincón verde
      tl.fromTo(q(".s12-robotM"), { y: -700 }, { y: 0, duration: 0.45, ease: "bounce.out" }, 0);
      K.pop(tl, q(".s12-rot"), SCALERICS);
      K.sacudir(tl, esc, 0.3, 12);
      // la cinta de sastre lo mide
      qa(".s12-cinta path").forEach((p, i) => K.dibujar(tl, p, SISTEMA + (i > 1 ? 0.2 : 0), 0.45));
      K.golpe(tl, q(".s12-medida"), MEDIDA, 2.2);
      K.pantalla(tl, q(".s12-robot"), 1, HECHO - 0.1);
      // el dueño entra por la izquierda, con su forma de trabajar
      gsap.set(q(".s12-duenio"), { opacity: 0 });
      tl.fromTo(q(".s12-duenio"), { opacity: 1, x: -460 }, { x: 0, duration: 0.4, ease: "power3.out", immediateRender: false }, HECHO);
      tl.to(q(".s12-cinta"), { opacity: 0, duration: 0.2 }, TRABAJA);
      tl.to(q(".s12-medida"), { opacity: 0, duration: 0.2 }, TRABAJA);
      tl.to(q(".s12-robot .k-e-cabeza"), { rotation: -10, svgOrigin: "250 250", duration: 0.25, yoyo: true, repeat: 1 }, TRABAJA);
      K.pantalla(tl, q(".s12-robot"), 2, NEGOCIO);
      K.cara(tl, q(".s12-duenio"), "feliz", NEGOCIO);
      K.golpe(tl, q(".s12-hecho"), NEGOCIO, 1.8);
''', sfx=[(0.05, "whoosh-cinematic", 0.3, 0.8), (0.35, "impact-bass-1", 0.4, 0.5), (0.5, "sparkle", 0.3), (1.35, "whoosh-short", 0.3), (1.75, "impact-bass-2", 0.35, 0.6), (2.5, "whoosh", 0.25), (3.65, "chime", 0.3)])

# ---------- s13: la lista hecha a tu medida, y pelea de tu lado ----------
escena("s13-de-tu-lado", 5.71, r'''
S .s13-lista { position: absolute; left: 60px; top: 640px; width: 520px; }
S .s13-item { display: flex; align-items: center; gap: 22px; margin-bottom: 26px; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 54px; color: #f5f1e8; text-transform: uppercase; white-space: nowrap; }
S .s13-tic { position: relative; flex: none; width: 60px; height: 60px; border-radius: 50%; background: #5ce611; }
S .s13-tic::after { content: ""; position: absolute; left: 20px; top: 10px; width: 14px; height: 28px; border: solid #0d0e14; border-width: 0 8px 8px 0; transform: rotate(45deg); }
S .s13-lado { top: 600px; font-size: 104px; color: #5ce611; text-shadow: 0 0 36px rgba(92, 230, 17, 0.4); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s13-equipo">
            <g transform="translate(600 800) scale(0.72)"><g class="s13-robot"></g></g>
            <g transform="translate(40 860) scale(0.95)"><g class="s13-duenio"></g></g>
          </g>
          <g transform="translate(900 860) scale(0.5)"><g class="s13-enlM"><g class="s13-enl"></g></g></g>
          <g transform="translate(900 960) scale(0.6)"><g class="s13-pum"></g></g>
        </svg>
        <div class="s13-lista">
          <div class="s13-item s13-i0"><span class="s13-tic"></span>Por kilo</div>
          <div class="s13-item s13-i1"><span class="s13-tic"></span>Por bulto</div>
          <div class="s13-item s13-i2"><span class="s13-tic"></span>Dos locales</div>
          <div class="s13-item s13-i3"><span class="s13-tic"></span>Stock</div>
          <div class="s13-item s13-i4"><span class="s13-tic"></span>Proveedores</div>
        </div>
        <div class="txt s13-lado">De tu lado</div>
''', r'''
      const PANT = ["KILO: SÍ", "BULTO: SÍ", "2 LOCALES: SÍ", "STOCK: AL DÍA", "PROVEEDORES"];
      q(".s13-robot").innerHTML = ''' + VERDE + r''';
      q(".s13-duenio").innerHTML = K.duenio({ cara: "feliz", guantes: "#5ce611" });
      q(".s13-enl").innerHTML = K.enlatado({ pantalla: ["ERROR"] });
      q(".s13-pum").innerHTML = K.estallido("¡PUM!", "#5ce611", "#0d0e14", 60);
      const T = [0.08, 0.68, 1.62, 2.56, 3.33];
      const PELEA = 4.35, LADO = 4.78;
      // el equipo: el dueño queda atrás, a la izquierda, y la lista se va tildando
      tl.fromTo(q(".s13-equipo"), { opacity: 0.5 }, { opacity: 1, duration: 0.3 }, 0);
      gsap.set(q(".s13-duenio"), { opacity: 0.25 });
      T.forEach((t, i) => {
        const it = q(".s13-i" + i);
        gsap.set(it, { opacity: 0 });
        tl.fromTo(it, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, t);
        tl.fromTo(it.querySelector(".s13-tic"), { scale: 0 }, { scale: 1, duration: 0.25, ease: "back.out(3)", immediateRender: false }, t + 0.05);
        K.pantalla(tl, q(".s13-robot"), i, t);
      });
      // "pelea de tu lado": se va la lista, el dueño con guantes verdes y su sistema le pegan juntos al enlatado
      tl.to(q(".s13-lista"), { opacity: 0, x: -80, duration: 0.2 }, PELEA - 0.3);
      tl.to(q(".s13-duenio"), { opacity: 1, duration: 0.15 }, PELEA - 0.3);
      gsap.set(q(".s13-enl"), { opacity: 0 });
      tl.fromTo(q(".s13-enl"), { opacity: 1, x: 400 }, { x: 0, duration: 0.25, ease: "power3.out", immediateRender: false }, PELEA - 0.3);
      tl.to(q(".s13-duenio .k-d-brazoD"), { x: 260, duration: 0.1, ease: "power4.in" }, PELEA);
      tl.to(q(".s13-robot .k-e-brazoD"), { x: 160, duration: 0.1, ease: "power4.in" }, PELEA);
      tl.to(q(".s13-enlM"), { x: 900, y: -500, duration: 0.5, ease: "power2.in" }, PELEA + 0.1);
      tl.to(q(".s13-enl"), { rotation: 160, svgOrigin: "250 360", duration: 0.5, ease: "power2.in" }, PELEA + 0.1);
      gsap.set(q(".s13-pum"), { opacity: 0 });
      tl.fromTo(q(".s13-pum"), { opacity: 1, scale: 0.3, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.16, ease: "back.out(3)", immediateRender: false }, PELEA + 0.1);
      tl.to(q(".s13-pum"), { opacity: 0, duration: 0.2 }, PELEA + 0.7);
      tl.to(q(".s13-duenio .k-d-brazoD"), { x: 0, duration: 0.3 }, PELEA + 0.3);
      tl.to(q(".s13-robot .k-e-brazoD"), { x: 0, duration: 0.3 }, PELEA + 0.3);
      K.sacudir(tl, esc, PELEA + 0.12, 20);
      K.golpe(tl, q(".s13-lado"), LADO);
''', sfx=[(0.1, "pop", 0.3), (0.7, "pop", 0.3), (1.64, "pop", 0.3), (2.58, "pop", 0.3), (3.35, "pop", 0.3), (4.3, "golpe", 0.6), (4.33, "impact-bass-2", 0.45, 0.6), (4.45, "aplausos", 0.35, 1.3)])

# ---------- s14: ganador por nocaut ----------
escena("s14-ganador", 4.33, r'''
S .s14-ko { top: 590px; font-size: 200px; color: #ffc531; text-shadow: 0 0 50px rgba(255, 197, 49, 0.45); }
S .s14-gana { left: 640px; top: 660px; font-size: 58px; color: #ffc531; transform: rotate(5deg); }
S .s14-negocio { top: 1410px; font-size: 104px; color: #5ce611; text-shadow: 0 0 36px rgba(92, 230, 17, 0.4); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(640 1420) rotate(-90) scale(0.5)"><g class="s14-enl"></g></g>
          <g transform="translate(-10 990) scale(0.66)"><g class="s14-anun"></g></g>
          <g transform="translate(340 770) scale(1.0)"><g class="s14-duenio"></g>
            <g class="s14-cinto"><rect x="120" y="380" width="160" height="44" rx="8" fill="#ffc531" stroke="#0d0e14" stroke-width="4"/><circle cx="200" cy="402" r="30" fill="#ffc531" stroke="#0d0e14" stroke-width="5"/><circle cx="200" cy="402" r="14" fill="#5ce611"/></g>
          </g>
          <g class="s14-conf">
            <rect x="120" y="520" width="16" height="26" fill="#ffc531"/><rect x="300" y="480" width="14" height="22" fill="#5ce611"/><rect x="520" y="500" width="16" height="26" fill="#f5f1e8"/><rect x="760" y="470" width="14" height="24" fill="#ffc531"/><rect x="940" y="510" width="16" height="26" fill="#5ce611"/><rect x="420" y="440" width="12" height="20" fill="#e5383b"/><rect x="860" y="430" width="12" height="20" fill="#f5f1e8"/><rect x="200" y="420" width="12" height="20" fill="#5ce611"/>
          </g>
          <g class="s14-x" stroke="#e5383b" stroke-width="10" stroke-linecap="round"><path d="M690 1330 l30 30 M720 1330 l-30 30 M690 1270 l30 30 M720 1270 l-30 30"/></g>
        </svg>
        <div class="sello s14-gana">Ganador</div>
        <div class="txt s14-ko">K.O.</div>
        <div class="txt s14-negocio">Tu negocio</div>
''', r'''
      q(".s14-enl").innerHTML = K.enlatado({ pantalla: ["ERROR"] });
      q(".s14-anun").innerHTML = K.anunciador({ cable: -900 });
      q(".s14-duenio").innerHTML = K.duenio({ cara: "feliz", guantes: "#5ce611" });
      const GANADOR = 0.27, NOCAUT = 1.34, NEGOCIO = 2.59;
      tl.fromTo(q(".s14-duenio"), { y: 30 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s14-anun .k-a-boca"), { scaleY: 0.5, svgOrigin: "200 224" }, { scaleY: 1.6, svgOrigin: "200 224", duration: 0.15, yoyo: true, repeat: 17, ease: "sine.inOut" }, 0);
      // levanta el brazo del ganador
      tl.to(q(".s14-duenio .k-d-brazoD"), { y: -170, duration: 0.25, ease: "back.out(2)" }, GANADOR);
      K.golpe(tl, q(".s14-gana"), GANADOR + 0.1, 2.2);
      // K.O.
      K.golpe(tl, q(".s14-ko"), NOCAUT, 3);
      K.sacudir(tl, esc, NOCAUT + 0.05, 22);
      tl.to(q(".s14-gana"), { opacity: 0, duration: 0.15 }, NOCAUT - 0.1);
      gsap.set(q(".s14-x"), { opacity: 0 });
      tl.to(q(".s14-x"), { opacity: 1, duration: 0.05 }, NOCAUT);
      tl.fromTo(q(".s14-enl"), { y: 0 }, { y: -20, duration: 0.08, yoyo: true, repeat: 3, immediateRender: false }, NOCAUT);
      // papelitos
      gsap.set(q(".s14-conf"), { opacity: 0 });
      tl.to(q(".s14-conf"), { opacity: 1, duration: 0.1 }, NOCAUT);
      qa(".s14-conf rect").forEach((r, i) => tl.fromTo(r, { y: -120, rotation: 0, svgOrigin: "0 0" }, { y: 700 + (i % 3) * 120, rotation: 0, duration: 3, ease: "none", immediateRender: false }, NOCAUT + i * 0.06));
      tl.to(q(".s14-ko"), { opacity: 0.25, scale: 0.8, duration: 0.25 }, NEGOCIO - 0.2);
      K.golpe(tl, q(".s14-negocio"), NEGOCIO);
      tl.to(q(".s14-duenio"), { y: -30, duration: 0.2, yoyo: true, repeat: 3, ease: "power2.out" }, NEGOCIO);
''', sfx=[(0.2, "impact-bass-1", 0.35, 0.5), (1.0, "redoble", 0.3), (1.3, "impact-bass-2", 0.5, 0.7), (1.35, "campana", 0.5), (1.45, "aplausos", 0.4), (2.55, "impact-bass-1", 0.4, 0.5)])

# ---------- s15: ¿quién va ganando en tu local? ----------
escena("s15-cta", 7.24, r'''
S .s15-quien { top: 596px; font-size: 74px; color: #f5f1e8; }
S .s15-card { position: absolute; top: 760px; width: 440px; height: 520px; border-radius: 22px; border: 8px solid; background: #0d0e14; }
S .s15-neg { left: 60px; border-color: #e5383b; }
S .s15-sis { right: 60px; border-color: #2f6bff; }
S .s15-nom { position: absolute; left: 0; right: 0; bottom: 30px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 62px; text-transform: uppercase; }
S .s15-neg .s15-nom { color: #e5383b; }
S .s15-sis .s15-nom { color: #2f6bff; }
S .s15-vs { position: absolute; left: 0; right: 0; top: 960px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 70px; color: #ffc531; }
S .s15-coment { position: absolute; left: 0; right: 0; top: 1330px; text-align: center; }
S .s15-coment span { display: inline-block; padding: 14px 30px; background: #ffc531; color: #0d0e14; border-radius: 30px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; text-transform: uppercase; white-space: nowrap; }
''', r'''
        <div class="s15-card s15-neg"><div class="s15-nom">Negocio</div></div>
        <div class="s15-card s15-sis"><div class="s15-nom">Sistema</div></div>
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(160 800) scale(0.6)"><g class="s15-duenio"></g></g>
          <g transform="translate(668 810) scale(0.5)"><g class="s15-enl"></g></g>
        </svg>
        <div class="s15-vs">VS</div>
        <div class="txt s15-quien">¿Quién va ganando?</div>
        <div class="s15-coment"><span>Votá en los comentarios</span></div>
''', r'''
      q(".s15-duenio").innerHTML = K.duenio({ cara: "guardia" });
      q(".s15-enl").innerHTML = K.enlatado({ pantalla: ["???"] });
      const QUIEN = 0.9, COMENTA = 1.93, NEGOCIO = 2.18, SISTEMA = 3.27;
      tl.fromTo([q(".s15-neg"), q(".s15-sis")], { opacity: 0.3, scale: 0.92 }, { opacity: 0.55, scale: 1, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s15-duenio"), { opacity: 0.3 }, { opacity: 0.55, duration: 0.4 }, 0);
      tl.fromTo(q(".s15-enl"), { opacity: 0.3 }, { opacity: 0.55, duration: 0.4 }, 0);
      K.golpe(tl, q(".s15-quien"), QUIEN);
      K.sacudir(tl, esc, QUIEN + 0.05, 10);
      K.pop(tl, q(".s15-vs"), QUIEN + 0.3);
      K.pop(tl, q(".s15-coment"), COMENTA);
      // NEGOCIO
      tl.to([q(".s15-neg"), q(".s15-duenio")], { opacity: 1, duration: 0.1 }, NEGOCIO);
      tl.fromTo(q(".s15-neg"), { scale: 1.12 }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, NEGOCIO);
      tl.to(q(".s15-duenio .k-d-brazoD"), { y: -60, duration: 0.15, yoyo: true, repeat: 3 }, NEGOCIO);
      // SISTEMA
      tl.to([q(".s15-sis"), q(".s15-enl")], { opacity: 1, duration: 0.1 }, SISTEMA);
      tl.fromTo(q(".s15-sis"), { scale: 1.12 }, { scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, SISTEMA);
      tl.to(q(".s15-enl .k-e-brazoI"), { y: -60, duration: 0.15, yoyo: true, repeat: 3 }, SISTEMA);
      // queda latiendo, de a uno, hasta el final
      for (let k = 0; k < 6; k++) {
        const t = 4.0 + k * 0.5;
        tl.to(k % 2 ? q(".s15-sis") : q(".s15-neg"), { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, t);
      }
      tl.fromTo(q(".s15-coment"), { y: 0 }, { y: -10, duration: 0.3, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, COMENTA + 0.4);
''', sfx=[(0.85, "impact-bass-1", 0.35, 0.5), (1.9, "notification", 0.35), (2.15, "impact-bass-2", 0.4, 0.6), (3.25, "impact-bass-2", 0.4, 0.6), (4.2, "campana", 0.45)])
