import sys; sys.path.insert(0, "gen")
from escena import escena

# ---------- s01: la paliza de todas las noches ----------
escena("s01-paliza", 4.37, r'''
S .s01-paliza { top: 500px; font-size: 150px; }
S .s01-volves { top: 500px; font-size: 128px; }
S .s01-tag { position: absolute; left: 0; right: 0; top: 1350px; text-align: center; }
S .s01-tag span { display: inline-block; padding: 10px 26px; background: #0b0b12; border: 4px solid #ffd23f; border-radius: 8px; color: #ffd23f; font-size: 32px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(570 640) scale(0.95)"><g class="s01-rival"></g></g>
          <g transform="translate(70 700) scale(0.95)"><g class="s01-dmov"><g class="s01-duenio"></g></g></g>
          <g transform="translate(470 930) scale(0.85)"><g class="s01-paf"></g></g>
        </svg>
        <div class="cartel rojo s01-paliza">¡Paliza!</div>
        <div class="cartel s01-volves">¡Y volvés!</div>
        <div class="mono s01-tag"><span>TODAS LAS NOCHES · 23:00</span></div>
''', r'''
      q(".s01-rival").innerHTML = K.luchador({ color: "#2b2540", trim: "#e8332a", emblema: "planilla", boca: "risa" });
      q(".s01-duenio").innerHTML = K.duenio({ cara: "cansado" });
      q(".s01-paf").innerHTML = K.estallido("¡PAF!", "#ffd23f", "#0b0b12", 76);
      const PALIZA = 1.15, Y = 2.19, SUBIR = 2.69, RING = 3.08;
      const du = q(".s01-duenio"), ri = q(".s01-rival");
      // cuadro 0: los dos en el ring, la cámara se acerca
      tl.fromTo(esc, { scale: 1.08 }, { scale: 1, duration: DUR, ease: "none", transformOrigin: "50% 60%" }, 0);
      tl.to(du, { y: 8, duration: 0.3, yoyo: true, repeat: 2, ease: "sine.inOut" }, 0);
      // el rival levanta el brazo y baja el golpe
      tl.to(q(".s01-rival .k-l-brazoI"), { rotation: 40, svgOrigin: "118 262", duration: 0.5, ease: "power2.out" }, 0.3);
      tl.to(q(".s01-rival .k-l-brazoI"), { rotation: -50, x: -60, svgOrigin: "118 262", duration: 0.12, ease: "power4.in" }, PALIZA - 0.12);
      K.popSvg(tl, q(".s01-paf"), PALIZA);
      K.fueraSvg(tl, q(".s01-paf"), PALIZA + 0.6);
      K.cara(tl, du, "dolor", PALIZA);
      tl.to(du, { rotation: -78, svgOrigin: "200 632", duration: 0.35, ease: "power3.in" }, PALIZA);
      tl.to(q(".s01-dmov"), { x: 240, duration: 0.35, ease: "power3.in" }, PALIZA);
      K.cara(tl, du, "ko", PALIZA + 0.35);
      K.sacudir(tl, esc, PALIZA + 0.36, 20);
      K.golpe(tl, q(".s01-paliza"), PALIZA + 0.05);
      K.pop(tl, q(".s01-tag"), PALIZA + 0.4);
      tl.to(q(".s01-rival .k-l-brazoI"), { rotation: 0, x: 0, svgOrigin: "118 262", duration: 0.4 }, PALIZA + 0.3);
      // "y vos volvés a subir": se levanta, tambaleando
      tl.to(q(".s01-paliza"), { opacity: 0, y: -30, duration: 0.2 }, Y - 0.1);
      K.cara(tl, du, "cansado", Y + 0.1);
      tl.to(du, { rotation: 0, svgOrigin: "200 632", duration: 0.55, ease: "back.out(1.4)" }, Y + 0.05);
      tl.to(q(".s01-dmov"), { x: 0, duration: 0.55, ease: "power2.out" }, Y + 0.05);
      tl.to(q(".s01-duenio .k-d-sudor"), { opacity: 1, duration: 0.1 }, Y + 0.4);
      tl.fromTo(q(".s01-duenio .k-d-sudor"), { y: 0 }, { y: 40, duration: 0.8, ease: "power1.in", immediateRender: false }, Y + 0.4);
      tl.to(du, { rotation: 4, svgOrigin: "200 632", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, Y + 0.65);
      K.golpe(tl, q(".s01-volves"), SUBIR);
      // "ring": el rival se ríe y saca músculo
      K.cara(tl, ri, "grito", RING, "k-l-boca");
      tl.to(q(".s01-rival .k-l-brazoD"), { rotation: -20, svgOrigin: "322 262", duration: 0.2, yoyo: true, repeat: 3 }, RING);
      tl.to(q(".s01-volves"), { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1 }, RING + 0.1);
''', sfx=[(0.05, "murmullo", 0.3, 2.5), (1.05, "golpe", 0.6), (1.1, "impact-bass-2", 0.4, 0.6), (1.3, "uuh", 0.35, 1.3), (1.5, "impact-bass-1", 0.35, 0.5), (2.6, "pop", 0.3), (3.1, "aplausos", 0.2, 1.2)])

# ---------- s02: el presentador y el póster de la velada ----------
escena("s02-cartel", 3.36, r'''
S .s02-poster { position: absolute; left: 70px; top: 640px; width: 560px; height: 640px; padding: 30px 26px; background: #ffd23f; border: 8px solid #0b0b12; border-radius: 6px; transform: rotate(-3deg); text-align: center; font-family: "Lexend", sans-serif; text-transform: uppercase; color: #0b0b12; box-shadow: 14px 14px 0 #e8332a; }
S .s02-poster .p1 { font-weight: 800; font-size: 34px; letter-spacing: 0.1em; }
S .s02-poster .p2 { margin-top: 10px; font-weight: 900; font-size: 92px; line-height: 0.9; color: #e8332a; -webkit-text-stroke: 4px #0b0b12; paint-order: stroke fill; }
S .s02-poster .p3 { margin: 14px auto 0; width: 420px; padding: 8px 0; background: #0b0b12; color: #ffd23f; font-weight: 800; font-size: 34px; letter-spacing: 0.08em; }
S .s02-poster .p4 { margin-top: 22px; font-weight: 900; font-size: 64px; line-height: 0.95; }
S .s02-poster .p5 { font-weight: 900; font-size: 50px; color: #2a5cff; }
S .s02-poster .p6 { margin-top: 18px; font-weight: 700; font-size: 30px; letter-spacing: 0.14em; }
S .s02-sello { left: 470px; top: 520px; font-size: 52px; color: #e8332a; background: #0b0b12; transform: rotate(6deg); }
''', r'''
        <div class="s02-poster">
          <div class="p1">Gran velada de</div>
          <div class="p2">Lucha libre</div>
          <div class="p3">Esta noche · 23 h</div>
          <div class="p4">El dueño</div>
          <div class="p5">vs.</div>
          <div class="p4">Sus tareas</div>
          <div class="p6">Entrada libre</div>
        </div>
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(640 700) scale(0.93)"><g class="s02-pres"></g></g>
        </svg>
        <div class="sello s02-sello">Como en la tele</div>
''', r'''
      q(".s02-pres").innerHTML = K.presentador({ boca: "grito" });
      const pr = q(".s02-pres");
      const SENIORES = 0.69, COMO = 1.65, TITANES = 2.25;
      tl.fromTo(q(".s02-poster"), { opacity: 0.3, y: -60, rotation: -9 }, { opacity: 1, y: 0, rotation: -3, duration: 0.35, ease: "back.out(2)" }, 0);
      tl.fromTo(pr, { x: 260 }, { x: 0, duration: 0.35, ease: "power3.out" }, 0);
      K.hablar(tl, pr, 0, 3.1);
      // los brazos al cielo en "señores"
      tl.to(q(".s02-pres .k-p-brazo"), { rotation: -25, svgOrigin: "272 290", duration: 0.2, yoyo: true, repeat: 1 }, SENIORES);
      // las líneas del póster se encienden una por una
      qa(".s02-poster > div").forEach((d, i) => tl.fromTo(d, { opacity: 0.15 }, { opacity: 1, duration: 0.12 }, 0.15 + i * 0.22));
      tl.to(q(".s02-poster"), { scale: 1.04, duration: 0.12, yoyo: true, repeat: 1 }, COMO);
      K.golpe(tl, q(".s02-sello"), TITANES + 0.1, 2.2);
      K.sacudir(tl, esc, TITANES + 0.05, 10);
      tl.to(pr, { y: -16, duration: 0.15, yoyo: true, repeat: 3 }, TITANES);
''', sfx=[(0.0, "aplausos", 0.25, 2.0), (0.2, "whoosh", 0.25, 0.5), (0.7, "pop", 0.25), (2.2, "impact-bass-1", 0.4, 0.6), (2.3, "campana1", 0.35)])

# ---------- s03: en este rincón, el dueño ----------
escena("s03-rincon", 5.93, r'''
S .s03-tag { position: absolute; padding: 8px 18px; background: #0b0b12; border: 4px solid #ffd23f; border-radius: 8px; color: #ffd23f; font-size: 28px; }
S .s03-t1 { left: 40px; top: 690px; }
S .s03-t2 { left: 700px; top: 1040px; }
S .s03-duenio { top: 500px; font-size: 132px; }
S .s03-ficha { position: absolute; left: 160px; top: 1330px; width: 760px; padding: 12px 22px; background: #f4efe2; border: 5px solid #0b0b12; border-radius: 8px; color: #0b0b12; font-size: 28px; text-align: center; box-shadow: 8px 8px 0 #2a5cff; }
S .s03-cerrado { position: absolute; left: 66px; top: 1000px; width: 240px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 38px; color: #e8332a; letter-spacing: 0.04em; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-local">
            <rect x="60" y="820" width="252" height="300" fill="#0b0b12" stroke="#f4efe2" stroke-width="6"/>
            <rect x="48" y="790" width="276" height="50" rx="4" fill="#e8332a" stroke="#0b0b12" stroke-width="5"/>
            <text x="186" y="826" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="28" fill="#f4efe2">TU LOCAL</text>
            <g class="s03-luz"><rect x="84" y="860" width="204" height="240" fill="#ffd23f" fill-opacity="0.85"/></g>
            <g class="s03-persiana"><rect x="66" y="846" width="240" height="268" fill="#9a9aa8" stroke="#0b0b12" stroke-width="4"/>
              <path d="M66 876 H306 M66 906 H306 M66 936 H306 M66 966 H306 M66 996 H306 M66 1026 H306 M66 1056 H306 M66 1086 H306" stroke="#0b0b12" stroke-width="3" stroke-opacity="0.5"/></g>
          </g>
          <g transform="translate(340 700) scale(0.95)"><g class="s03-du"></g></g>
          <path class="s03-f1" d="M270 740 Q380 700 470 790" stroke="#ffd23f" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path class="s03-f2" d="M760 1030 Q700 990 640 1010" stroke="#ffd23f" stroke-width="7" fill="none" stroke-linecap="round"/>
        </svg>
        <div class="mono s03-tag s03-t1">SIN MÁSCARA</div>
        <div class="mono s03-tag s03-t2">CON DELANTAL</div>
        <div class="cartel azul s03-duenio">¡El dueño!</div>
        <div class="s03-cerrado">CERRADO</div>
        <div class="mono s03-ficha">ENTRENA DE 7 A 23 · CENA: NUNCA</div>
''', r'''
      q(".s03-du").innerHTML = K.duenio({ cara: "cansado" });
      const du = q(".s03-du");
      const MASCARA = 0.25, DELANTAL = 0.95, DUENIO = 2.18, LOCAL = 2.87, PARA = 4.24, PERSIANA = 4.86;
      tl.fromTo(du, { y: 30, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 0);
      gsap.set(q(".s03-local"), { opacity: 0 });
      gsap.set(q(".s03-persiana"), { y: -268, opacity: 0 });
      K.pop(tl, q(".s03-t1"), MASCARA);
      K.dibujar(tl, q(".s03-f1"), MASCARA + 0.05, 0.35);
      K.pop(tl, q(".s03-t2"), DELANTAL);
      K.dibujar(tl, q(".s03-f2"), DELANTAL + 0.05, 0.35);
      tl.to(q(".s03-du .k-d-delantal"), { fill: "#ffd23f", duration: 0.12, yoyo: true, repeat: 1 }, DELANTAL + 0.3);
      // "el dueño del local": lo presentan, saluda sin ganas
      tl.to([q(".s03-t1"), q(".s03-t2"), q(".s03-f1"), q(".s03-f2")], { opacity: 0, duration: 0.2 }, DUENIO - 0.25);
      K.golpe(tl, q(".s03-duenio"), DUENIO + 0.05);
      tl.to(q(".s03-du .k-d-brazoD"), { rotation: -150, svgOrigin: "276 266", duration: 0.3, ease: "back.out(2)" }, DUENIO + 0.2);
      tl.to(q(".s03-du .k-d-brazoD"), { rotation: -135, svgOrigin: "276 266", duration: 0.2, yoyo: true, repeat: 3 }, DUENIO + 0.5);
      K.pop(tl, q(".s03-ficha"), LOCAL);
      tl.to(q(".s03-du .k-d-brazoD"), { rotation: 0, svgOrigin: "276 266", duration: 0.3 }, PARA - 0.5);
      // "pará, que bajo la persiana": aparece el local y baja la persiana
      tl.to(q(".s03-duenio"), { opacity: 0, duration: 0.2 }, PARA - 0.3);
      tl.to(du, { x: 140, duration: 0.3, ease: "power2.out" }, PARA - 0.3);
      tl.to(q(".s03-local"), { opacity: 1, duration: 0.2 }, PARA - 0.2);
      tl.to(q(".s03-du .k-d-brazoI"), { rotation: 60, svgOrigin: "124 266", duration: 0.25, ease: "back.out(2)" }, PARA);
      tl.set(q(".s03-persiana"), { opacity: 1 }, PERSIANA - 0.3);
      tl.to(q(".s03-persiana"), { y: 0, duration: 0.6, ease: "bounce.out" }, PERSIANA - 0.3);
      tl.to(q(".s03-luz"), { opacity: 0, duration: 0.3 }, PERSIANA + 0.2);
      tl.fromTo(q(".s03-cerrado"), { opacity: 0 }, { opacity: 1, duration: 0.01 }, PERSIANA + 0.4);
''', sfx=[(0.2, "pop", 0.25), (0.9, "pop", 0.25), (2.1, "impact-bass-1", 0.4, 0.6), (2.2, "aplausos", 0.2, 1.4), (2.9, "click", 0.25), (4.55, "glitch-1", 0.2, 0.3), (4.6, "golpe", 0.3)])
