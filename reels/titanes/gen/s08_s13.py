import sys; sys.path.insert(0, "gen")
from escena import escena

COMPA = '{ color: "#0b0b12", trim: "#5ce611", emblema: "engranaje", nombre: "AUTOMATIZACIÓN", tamNombre: 17, boca: "risa" }'
PLANILLA = '{ color: "#2a5cff", trim: "#ffd23f", emblema: "planilla", nombre: "LA PLANILLA", boca: "dolor" }'
COPIA = '{ color: "#ffd23f", trim: "#e8332a", emblema: "copia", nombre: "COPIA-PEGA", tamNombre: 20, boca: "dolor" }'
RECORD = '{ color: "#e8332a", trim: "#f4efe2", emblema: "reloj", nombre: "RECORDATORIO", tamNombre: 17, boca: "dolor" }'
LISTO = '{ color: "#0b0b12", trim: "#ffd23f", emblema: "listo", nombre: "¡ESTÁ LISTO!", boca: "dolor" }'

# ---------- s08: a la lona, once de la noche, uno dos tres ----------
escena("s08-lona", 6.75, r'''
S .s08-lona { top: 490px; font-size: 140px; }
S .s08-hora { position: absolute; left: 340px; top: 470px; width: 400px; padding: 6px 0 14px; text-align: center; background: #0b0b12; border: 6px solid #e8332a; border-radius: 16px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 120px; color: #e8332a; letter-spacing: 0.04em; }
S .s08-n { top: 450px; font-size: 230px; }
S .s08-ko { left: 690px; top: 1040px; font-size: 76px; color: #ffd23f; background: #0b0b12; transform: rotate(-8deg); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 790) scale(0.47)"><g class="s08-r1"></g></g>
          <g transform="translate(250 780) scale(0.47)"><g class="s08-r2"></g></g>
          <g transform="translate(460 790) scale(0.47)"><g class="s08-r3"></g></g>
          <g transform="translate(670 780) scale(0.47)"><g class="s08-r4"></g></g>
          <g transform="translate(150 1310) rotate(-90) scale(0.72)"><g class="s08-du"></g></g>
          <g transform="translate(730 920) scale(0.95)"><g class="s08-arb"></g></g>
        </svg>
        <div class="cartel rojo s08-lona">¡A la lona!</div>
        <div class="s08-hora">23:00</div>
        <div class="cartel s08-n s08-n1">1</div>
        <div class="cartel s08-n s08-n2">2</div>
        <div class="cartel rojo s08-n s08-n3">3</div>
        <div class="sello s08-ko">K.O.</div>
''', r'''
      q(".s08-r1").innerHTML = K.luchador(''' + PLANILLA.replace('"dolor"', '"risa"') + r''');
      q(".s08-r2").innerHTML = K.luchador(''' + COPIA.replace('"dolor"', '"risa"') + r''');
      q(".s08-r3").innerHTML = K.luchador(''' + RECORD.replace('"dolor"', '"risa"') + r''');
      q(".s08-r4").innerHTML = K.luchador(''' + LISTO.replace('"dolor"', '"risa"') + r''');
      q(".s08-du").innerHTML = K.duenio({ cara: "ko" });
      q(".s08-arb").innerHTML = K.arbitro();
      const LONA = 0.4, ONCE = 1.62, CUENTA = [3.14, 3.97, 4.96];
      // el dueño cae de golpe en el cuadro 0 (ya está casi en la lona)
      tl.fromTo(q(".s08-du"), { y: -120, rotation: 30, svgOrigin: "200 632" }, { y: 0, rotation: 0, svgOrigin: "200 632", duration: 0.35, ease: "power3.in" }, 0);
      K.sacudir(tl, esc, 0.36, 22);
      K.golpe(tl, q(".s08-lona"), LONA + 0.05);
      // los cuatro rivales festejan atrás
      [".s08-r1", ".s08-r2", ".s08-r3", ".s08-r4"].forEach((s, i) => {
        tl.fromTo(q(s), { y: 0 }, { y: -30, duration: 0.18, yoyo: true, repeat: 5, ease: "power2.out", immediateRender: false }, 0.5 + i * 0.08);
        tl.to(q(s + " .k-l-brazoD"), { rotation: -40, svgOrigin: "322 262", duration: 0.2 }, 0.5 + i * 0.08);
      });
      // once de la noche
      tl.to(q(".s08-lona"), { opacity: 0, duration: 0.15 }, ONCE - 0.2);
      K.golpe(tl, q(".s08-hora"), ONCE, 1.8);
      tl.to(q(".s08-hora"), { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 3, ease: "steps(1)" }, ONCE + 0.3);
      tl.to(q(".s08-hora"), { opacity: 0, duration: 0.15 }, CUENTA[0] - 0.15);
      // el árbitro cuenta
      gsap.set(q(".s08-arb"), { opacity: 0 });
      tl.fromTo(q(".s08-arb"), { opacity: 1, x: 300 }, { x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, 2.5);
      CUENTA.forEach((t, i) => {
        tl.to(q(".s08-arb .k-a-brazo"), { rotation: -70, svgOrigin: "200 190", duration: 0.2, ease: "power2.out" }, t - 0.4);
        tl.to(q(".s08-arb .k-a-brazo"), { rotation: 0, svgOrigin: "200 190", duration: 0.1, ease: "power4.in" }, t - 0.1);
        K.sacudir(tl, esc, t, 10);
        K.golpe(tl, q(".s08-n" + (i + 1)), t + 0.02, 2.6);
        if (i < 2) tl.to(q(".s08-n" + (i + 1)), { opacity: 0, duration: 0.1 }, CUENTA[i + 1] - 0.12);
      });
      K.golpe(tl, q(".s08-ko"), CUENTA[2] + 0.5, 2.2);
      tl.to(q(".s08-du"), { y: -8, duration: 0.6, yoyo: true, repeat: 2, ease: "sine.inOut" }, 5.0);
''', sfx=[(0.3, "golpe", 0.6), (0.33, "impact-bass-2", 0.45, 0.7), (0.5, "uuh", 0.35, 1.4), (1.6, "beep", 0.25, 0.8), (3.08, "golpe", 0.45), (3.91, "golpe", 0.45), (4.9, "golpe", 0.55), (5.0, "campana", 0.5), (5.4, "aplausos", 0.25, 1.2)])

# ---------- s09: ¡pero esperen! lucha por parejas, el relevo ----------
escena("s09-relevo", 6.98, r'''
S .s09-esperen { top: 490px; font-size: 128px; }
S .s09-pinias { top: 490px; font-size: 104px; }
S .s09-parejas { top: 490px; font-size: 96px; }
S .s09-tag { position: absolute; left: 0; right: 0; top: 1350px; text-align: center; }
S .s09-tag span { display: inline-block; padding: 10px 26px; background: #0b0b12; border: 4px solid #5ce611; border-radius: 8px; color: #5ce611; font-size: 32px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(-40 650) scale(0.86)"><g class="s09-compa"></g></g>
          <g transform="translate(470 790) scale(0.8)"><g class="s09-dmov"><g class="s09-du"></g></g></g>
          <g transform="translate(690 700) scale(0.88)"><g class="s09-pres"></g></g>
          <g transform="translate(330 960) scale(0.6)"><g class="s09-choque"></g></g>
        </svg>
        <div class="cartel s09-esperen">¡Esperen!</div>
        <div class="cartel rojo s09-pinias">¡A piñas no!</div>
        <div class="cartel azul s09-parejas">¡Por parejas!</div>
        <div class="mono s09-tag"><span>RELEVO</span></div>
''', r'''
      q(".s09-compa").innerHTML = K.luchador(''' + COMPA + r''');
      q(".s09-du").innerHTML = K.duenio({ cara: "ko" });
      q(".s09-pres").innerHTML = K.presentador({ boca: "grito" });
      q(".s09-choque").innerHTML = K.estallido("¡PLAF!", "#5ce611", "#0b0b12", 64);
      const co = q(".s09-compa"), du = q(".s09-du"), pr = q(".s09-pres");
      const ESTO = 0.78, PINIAS = 1.41, ES = 2.09, PAREJAS = 2.66, DUENIO = 3.59, RELEVO = 4.3, COMPANIERO = 5.31;
      // el compañero espera afuera del ring, a contraluz
      gsap.set(co, { filter: "brightness(0.12)" });
      // el presentador frena todo
      tl.fromTo(pr, { x: 300 }, { x: 0, duration: 0.25, ease: "power3.out" }, 0);
      K.hablar(tl, pr, 0, 2.9);
      K.golpe(tl, q(".s09-esperen"), 0.12);
      tl.to(q(".s09-esperen"), { opacity: 0, duration: 0.12 }, ESTO);
      K.golpe(tl, q(".s09-pinias"), PINIAS);
      tl.to(q(".s09-pinias"), { opacity: 0, duration: 0.12 }, ES);
      K.golpe(tl, q(".s09-parejas"), PAREJAS);
      K.sacudir(tl, esc, PAREJAS + 0.02, 10);
      tl.to(pr, { x: 420, duration: 0.4, ease: "power2.in" }, 2.9);
      // el dueño se arrastra a su rincón y estira la mano
      tl.to(du, { rotation: -10, svgOrigin: "200 632", duration: 0.3 }, 0.4);
      K.cara(tl, du, "dolor", 2.2);
      tl.to(q(".s09-dmov"), { x: -110, duration: 1.2, ease: "power1.inOut" }, 2.3);
      tl.to(q(".s09-parejas"), { opacity: 0, duration: 0.2 }, DUENIO);
      tl.to(q(".s09-du .k-d-brazoI"), { rotation: 95, svgOrigin: "124 266", duration: 0.5, ease: "power2.out" }, DUENIO - 0.2);
      tl.to(q(".s09-compa .k-l-brazoD"), { rotation: 70, svgOrigin: "322 262", duration: 0.5, ease: "power2.out" }, DUENIO);
      tl.to(co, { filter: "brightness(0.35)", duration: 0.4 }, DUENIO);
      // el relevo: chocan las manos
      K.popSvg(tl, q(".s09-choque"), RELEVO);
      K.fueraSvg(tl, q(".s09-choque"), RELEVO + 0.6);
      K.sacudir(tl, esc, RELEVO + 0.02, 14);
      K.pop(tl, q(".s09-tag"), RELEVO + 0.05);
      K.cara(tl, du, "feliz", RELEVO + 0.2);
      // "a su compañero": se enciende en verde
      tl.to(co, { filter: "brightness(1)", duration: 0.35, ease: "power2.out" }, COMPANIERO - 0.1);
      tl.fromTo(co, { scale: 1 }, { scale: 1.08, svgOrigin: "220 692", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, COMPANIERO);
      tl.to(q(".s09-compa .k-l-brazoD"), { rotation: -20, svgOrigin: "322 262", duration: 0.3 }, COMPANIERO + 0.3);
      tl.to(q(".s09-compa .k-l-brazoI"), { rotation: 20, svgOrigin: "118 262", duration: 0.3 }, COMPANIERO + 0.3);
''', sfx=[(0.0, "glitch-1", 0.25, 0.4), (0.1, "impact-bass-1", 0.4, 0.6), (1.35, "golpe", 0.3), (2.6, "pop", 0.3), (3.4, "riser", 0.3, 1.0), (4.25, "golpe", 0.55), (4.3, "impact-bass-2", 0.4, 0.6), (5.25, "sparkle", 0.35), (5.4, "aplausos", 0.3, 1.5)])

# ---------- s10: entra la automatización ----------
escena("s10-companero", 5.18, r'''
S .s10-nombre { top: 490px; font-size: 92px; }
S .s10-de { position: absolute; left: 0; right: 0; top: 600px; text-align: center; color: #f4efe2; font-size: 34px; letter-spacing: 0.3em; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 660) scale(0.9)"><g class="s10-compa"></g></g>
          <g transform="translate(640 700) scale(0.82)"><g class="s10-m1"><g class="s10-r1"></g></g></g>
          <g transform="translate(640 700) scale(0.82)"><g class="s10-m2"><g class="s10-r2"></g></g></g>
          <g transform="translate(540 1150) scale(0.55)"><g class="s10-hoja"></g></g>
          <g transform="translate(530 1060) scale(0.55)"><g class="s10-cel"></g></g>
          <g transform="translate(700 880) scale(0.62)"><g class="s10-pum"></g></g>
        </svg>
        <div class="cartel verde s10-nombre">¡Automatización!</div>
        <div class="mono s10-de">DE SCALERICS</div>
''', r'''
      q(".s10-compa").innerHTML = K.luchador(''' + COMPA + r''');
      q(".s10-r1").innerHTML = K.luchador(''' + PLANILLA + r''');
      q(".s10-r2").innerHTML = K.luchador(''' + LISTO + r''');
      q(".s10-hoja").innerHTML = K.planilla();
      q(".s10-cel").innerHTML = K.celular({ titulo: "Clientes", colorBarra: "#0b0b12", colorMio: "#2f8f0a", globos: [["¡Está listo!", 1], ["¡Está listo!", 1], ["¡Está listo!", 1], ["¡Está listo!", 1]] });
      q(".s10-pum").innerHTML = K.estallido("¡ZAS!", "#5ce611", "#0b0b12", 64);
      const co = q(".s10-compa");
      const SCALERICS = 0.78, PASA = 1.52, PLANILLA = 2.78, AVISA = 3.64, LISTO = 4.52;
      // entra saltando por encima de las cuerdas
      tl.fromTo(co, { y: -260, x: -160 }, { y: 0, x: 0, duration: 0.45, ease: "power2.in" }, 0);
      K.sacudir(tl, esc, 0.46, 18);
      K.golpe(tl, q(".s10-nombre"), 0.3);
      K.pop(tl, q(".s10-de"), SCALERICS);
      tl.to(co, { y: -16, duration: 0.25, yoyo: true, repeat: 1 }, SCALERICS);
      // La Planilla: él pasa los pedidos solo y la tira
      gsap.set([q(".s10-m1"), q(".s10-m2"), q(".s10-hoja"), q(".s10-cel"), q(".s10-pum")], { opacity: 0 });
      tl.fromTo(q(".s10-m1"), { opacity: 1, x: 400 }, { x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, PASA - 0.3);
      tl.to([q(".s10-nombre"), q(".s10-de")], { opacity: 0, duration: 0.2 }, PASA);
      K.popSvg(tl, q(".s10-hoja"), PASA + 0.2);
      tl.to(q(".s10-compa .k-l-brazoD"), { rotation: 60, svgOrigin: "322 262", duration: 0.15, ease: "power4.in" }, PLANILLA - 0.15);
      K.popSvg(tl, q(".s10-pum"), PLANILLA);
      K.fueraSvg(tl, q(".s10-pum"), PLANILLA + 0.45);
      tl.to(q(".s10-m1"), { x: 520, rotation: 40, svgOrigin: "220 692", duration: 0.45, ease: "power2.in" }, PLANILLA + 0.05);
      tl.to(q(".s10-hoja"), { y: -200, opacity: 0, duration: 0.4 }, PLANILLA + 0.1);
      tl.to(q(".s10-compa .k-l-brazoD"), { rotation: 0, svgOrigin: "322 262", duration: 0.3 }, PLANILLA + 0.3);
      // ¡Está listo!: avisa a todos de una y tira al otro
      tl.fromTo(q(".s10-m2"), { opacity: 1, x: 400 }, { x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, AVISA - 0.35);
      K.popSvg(tl, q(".s10-cel"), AVISA);
      [0, 1, 2, 3].forEach((i) => { gsap.set(q(".s10-cel .k-ce-g" + i), { opacity: 0 }); tl.to(q(".s10-cel .k-ce-g" + i), { opacity: 1, duration: 0.05 }, AVISA + 0.2 + i * 0.1); });
      tl.to(q(".s10-compa .k-l-brazoD"), { rotation: 60, svgOrigin: "322 262", duration: 0.15, ease: "power4.in" }, LISTO - 0.15);
      tl.set(q(".s10-pum"), { opacity: 0, scale: 1 }, LISTO - 0.01);
      K.popSvg(tl, q(".s10-pum"), LISTO);
      tl.to(q(".s10-m2"), { x: 520, rotation: 40, svgOrigin: "220 692", duration: 0.45, ease: "power2.in" }, LISTO + 0.05);
''', sfx=[(0.0, "whoosh", 0.35, 0.6), (0.44, "golpe", 0.5), (0.5, "aplausos", 0.3, 2.0), (0.8, "sparkle", 0.3), (1.8, "typing", 0.25, 0.8), (2.75, "golpe", 0.5), (3.85, "notification", 0.3), (4.5, "golpe", 0.5), (4.55, "uuh", 0.25, 0.8)])

# ---------- s11: recuerda turnos y pagos, el reporte, solo ----------
escena("s11-llaves", 4.22, r'''
S .s11-ok { position: absolute; left: 600px; width: 400px; padding: 14px 18px; background: #f4efe2; border: 5px solid #0b0b12; border-radius: 12px; box-shadow: 8px 8px 0 #5ce611; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #0b0b12; }
S .s11-ok b { color: #2f8f0a; font-weight: 900; }
S .s11-o1 { top: 720px; }
S .s11-o2 { top: 840px; }
S .s11-solo { top: 490px; font-size: 150px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 660) scale(0.9)"><g class="s11-compa"></g></g>
          <g transform="translate(650 700) scale(0.82)"><g class="s11-rm"><g class="s11-r"></g></g></g>
          <g transform="translate(800 1000) scale(0.75)"><g class="s11-cel"></g></g>
        </svg>
        <div class="s11-ok s11-o1"><b>✓</b> Turno 10:00 confirmado</div>
        <div class="s11-ok s11-o2"><b>✓</b> Gómez: pago recordado</div>
        <div class="cartel verde s11-solo">¡Solo!</div>
''', r'''
      q(".s11-compa").innerHTML = K.luchador(''' + COMPA + r''');
      q(".s11-r").innerHTML = K.luchador(''' + RECORD + r''');
      q(".s11-cel").innerHTML = K.celular({ titulo: "Reporte del día", colorBarra: "#0b0b12", colorMio: "#2f8f0a", globos: [["Pedidos: listos", 1], ["Avisos: enviados", 1], ["Turnos: al día", 1], ["Pagos: al día", 1]] });
      const co = q(".s11-compa");
      const TURNOS = 0.38, PAGOS = 0.73, MANDA = 1.6, REPORTE = 1.86, CELULAR = 2.82, SOLO = 3.42;
      // llave al Recordatorio, y sale volando
      tl.to(q(".s11-compa .k-l-brazoD"), { rotation: 60, svgOrigin: "322 262", duration: 0.12, ease: "power4.in" }, 0.1);
      tl.to(q(".s11-rm"), { x: 520, rotation: 35, svgOrigin: "220 692", duration: 0.45, ease: "power2.in" }, 0.22);
      K.sacudir(tl, esc, 0.24, 14);
      tl.to(q(".s11-compa .k-l-brazoD"), { rotation: 0, svgOrigin: "322 262", duration: 0.3 }, 0.5);
      K.pop(tl, q(".s11-o1"), TURNOS + 0.1);
      K.pop(tl, q(".s11-o2"), PAGOS + 0.1);
      // el reporte del día llega al celular
      tl.to([q(".s11-o1"), q(".s11-o2")], { opacity: 0, y: -30, duration: 0.2 }, MANDA - 0.2);
      gsap.set(q(".s11-cel"), { opacity: 0 });
      tl.fromTo(q(".s11-cel"), { opacity: 1, y: 400 }, { y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, MANDA);
      [0, 1, 2, 3].forEach((i) => { gsap.set(q(".s11-cel .k-ce-g" + i), { opacity: 0 }); tl.to(q(".s11-cel .k-ce-g" + i), { opacity: 1, duration: 0.08 }, REPORTE + 0.1 + i * 0.25); });
      tl.to(q(".s11-cel"), { rotation: -6, svgOrigin: "0 0", duration: 0.1, yoyo: true, repeat: 3 }, CELULAR);
      // ¡solo!: saca músculo
      K.golpe(tl, q(".s11-solo"), SOLO);
      tl.to(q(".s11-compa .k-l-brazoD"), { rotation: -25, svgOrigin: "322 262", duration: 0.2 }, SOLO);
      tl.to(q(".s11-compa .k-l-brazoI"), { rotation: 25, svgOrigin: "118 262", duration: 0.2 }, SOLO);
      tl.to(co, { y: -12, duration: 0.15, yoyo: true, repeat: 1 }, SOLO);
''', sfx=[(0.15, "golpe", 0.5), (0.25, "whoosh", 0.25, 0.5), (0.45, "ping", 0.3), (0.8, "ping", 0.3), (1.65, "notification", 0.3), (2.85, "chime", 0.3), (3.35, "impact-bass-1", 0.4, 0.6)])

# ---------- s12: el ganador cena caliente ----------
confeti = "".join(f'<rect class="s12-c" x="{(i * 137) % 1040 + 20}" y="{430 - (i * 53) % 400}" width="18" height="30" rx="3" fill="{["#ffd23f", "#e8332a", "#2a5cff", "#5ce611", "#f4efe2"][i % 5]}" transform="rotate({(i * 47) % 90} {(i * 137) % 1040 + 29} {445 - (i * 53) % 400})"/>' for i in range(34))
escena("s12-ganador", 4.39, r'''
S .s12-ganador { top: 490px; font-size: 128px; }
S .s12-cena { top: 490px; font-size: 104px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(-20 690) scale(0.85)"><g class="s12-compa"></g></g>
          <g transform="translate(360 690) scale(0.95)"><g class="s12-du"></g></g>
          <g class="s12-cinto"><rect x="460" y="1050" width="300" height="70" rx="20" fill="#ffd23f" stroke="#0b0b12" stroke-width="6"/><ellipse cx="610" cy="1085" rx="66" ry="46" fill="#ffd23f" stroke="#0b0b12" stroke-width="6"/><text x="610" y="1096" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="#0b0b12">CAMPEÓN</text></g>
          <g class="s12-plato"><ellipse cx="660" cy="1150" rx="120" ry="30" fill="#f4efe2" stroke="#0b0b12" stroke-width="6"/><path d="M590 1140 Q600 1100 660 1104 Q720 1100 730 1140 Z" fill="#c98f66" stroke="#0b0b12" stroke-width="5"/>
            <path class="s12-v1" d="M620 1090 q-16 -30 0 -60 q16 -30 0 -60" stroke="#f4efe2" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path class="s12-v2" d="M660 1090 q-16 -30 0 -60 q16 -30 0 -60" stroke="#f4efe2" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path class="s12-v3" d="M700 1090 q-16 -30 0 -60 q16 -30 0 -60" stroke="#f4efe2" stroke-width="6" fill="none" stroke-linecap="round"/></g>
          <clipPath id="s12-clip"><rect x="0" y="470" width="1080" height="1000"/></clipPath>
          <g clip-path="url(#s12-clip)"><g class="s12-confeti">''' + confeti + r'''</g></g>
        </svg>
        <div class="cartel s12-ganador">¡Ganador!</div>
        <div class="cartel verde s12-cena">¡Cena caliente!</div>
''', r'''
      q(".s12-compa").innerHTML = K.luchador(''' + COMPA + r''');
      q(".s12-du").innerHTML = K.duenio({ cara: "feliz" });
      const du = q(".s12-du");
      const GANADOR = 0.2, DUENIO = 1.06, CENA = 2.13, CALIENTE = 2.42;
      // el compañero le levanta el brazo
      tl.fromTo(q(".s12-du .k-d-brazoI"), { rotation: 60, svgOrigin: "124 266" }, { rotation: 160, svgOrigin: "124 266", duration: 0.35, ease: "back.out(2)" }, 0.05);
      tl.fromTo(q(".s12-compa .k-l-brazoD"), { rotation: 30, svgOrigin: "322 262" }, { rotation: -10, svgOrigin: "322 262", duration: 0.35, ease: "back.out(2)" }, 0.05);
      K.golpe(tl, q(".s12-ganador"), GANADOR + 0.05);
      K.sacudir(tl, esc, GANADOR + 0.06, 10);
      // confeti
      tl.fromTo(q(".s12-confeti"), { y: 0 }, { y: 1000, duration: DUR, ease: "none" }, 0);
      qa(".s12-c").forEach((c, i) => tl.to(c, { x: (i % 2 ? 1 : -1) * 40, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, (i % 5) * 0.1));
      // el cinturón de campeón en "el dueño"
      gsap.set(q(".s12-cinto"), { opacity: 0 });
      tl.fromTo(q(".s12-cinto"), { opacity: 1, y: -500 }, { y: 0, duration: 0.35, ease: "bounce.out", immediateRender: false }, DUENIO);
      tl.to(du, { y: -14, duration: 0.15, yoyo: true, repeat: 3 }, DUENIO + 0.2);
      // la cena caliente
      tl.to(q(".s12-ganador"), { opacity: 0, duration: 0.15 }, CENA - 0.15);
      K.golpe(tl, q(".s12-cena"), CALIENTE);
      tl.to(q(".s12-cinto"), { opacity: 0, duration: 0.15 }, CENA - 0.1);
      gsap.set(q(".s12-plato"), { opacity: 0 });
      tl.fromTo(q(".s12-plato"), { opacity: 1, scale: 0.4, svgOrigin: "660 1150" }, { scale: 1, svgOrigin: "660 1150", duration: 0.3, ease: "back.out(2)", immediateRender: false }, CENA);
      [".s12-v1", ".s12-v2", ".s12-v3"].forEach((v, i) => { K.dibujar(tl, q(v), CENA + 0.25 + i * 0.12, 0.5); tl.to(q(v), { y: -20, opacity: 0.4, duration: 0.8, yoyo: true, repeat: 1 }, CENA + 0.8 + i * 0.1); });
''', sfx=[(0.0, "campana", 0.45), (0.2, "aplausos", 0.35, 3.0), (1.05, "impact-bass-1", 0.35, 0.5), (1.2, "sparkle", 0.3), (2.15, "pop", 0.3), (2.4, "chime", 0.3)])

# ---------- s13: ¿cuál es el rival que te tira a vos? ----------
escena("s13-cta", 6.65, r'''
S .s13-cual { top: 490px; font-size: 104px; }
S .s13-nom { position: absolute; top: 1150px; width: 250px; text-align: center; font-size: 21px; letter-spacing: 0.04em; color: #ffd23f; }
S .s13-caja { position: absolute; left: 90px; top: 1250px; width: 900px; padding: 18px 26px; background: #f4efe2; border: 5px solid #0b0b12; border-radius: 18px; box-shadow: 10px 10px 0 #5ce611; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 36px; color: #0b0b12; white-space: nowrap; }
S .s13-caja i { font-style: normal; color: #2a5cff; }
S .s13-cursor { display: inline-block; width: 4px; height: 38px; background: #0b0b12; vertical-align: middle; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(25 760) scale(0.53)"><g class="s13-r1"></g></g>
          <g transform="translate(285 750) scale(0.53)"><g class="s13-r2"></g></g>
          <g transform="translate(545 760) scale(0.53)"><g class="s13-r3"></g></g>
          <g transform="translate(805 750) scale(0.53)"><g class="s13-r4"></g></g>
        </svg>
        <div class="cartel s13-cual">¿Cuál te tira?</div>
        <div class="mono s13-nom" style="left: 20px">LA PLANILLA</div>
        <div class="mono s13-nom" style="left: 280px">COPIA-PEGA</div>
        <div class="mono s13-nom" style="left: 540px">RECORDATORIO</div>
        <div class="mono s13-nom" style="left: 800px">¡ESTÁ LISTO!</div>
        <div class="s13-caja"><span class="s13-txt">Contanos: <i>el mío es...</i></span> <span class="s13-cursor"></span></div>
''', r'''
      const R = [''' + ", ".join(x.replace('"dolor"', '"burla"') for x in [PLANILLA, COPIA, RECORD, LISTO]) + r'''];
      R.forEach((o, i) => (q(".s13-r" + (i + 1)).innerHTML = K.luchador(o)));
      const RIVAL = 0.4, VOS = 1.3, CONTANOS = 1.92, COMENTARIOS = 2.72;
      // los cuatro rivales en fila, como en el póster
      [1, 2, 3, 4].forEach((i) => tl.fromTo(q(".s13-r" + i), { y: 80, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }, (i - 1) * 0.08));
      qa(".s13-nom").forEach((n, i) => tl.fromTo(n, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.2 + i * 0.08));
      K.golpe(tl, q(".s13-cual"), RIVAL);
      // el foco salta de uno a otro, como eligiendo
      [0.9, 1.4, 1.9, 2.4, 2.9, 3.4, 3.9, 4.4].forEach((t, k) => {
        const i = (k % 4) + 1;
        tl.fromTo(q(".s13-r" + i), { scale: 1 }, { scale: 1.12, svgOrigin: "220 692", duration: 0.2, yoyo: true, repeat: 1, immediateRender: false }, t);
        K.cara(tl, q(".s13-r" + i), "risa", t, "k-l-boca");
        K.cara(tl, q(".s13-r" + i), "burla", t + 0.45, "k-l-boca");
      });
      // la caja de comentario
      gsap.set(q(".s13-caja"), { opacity: 0 });
      tl.fromTo(q(".s13-caja"), { opacity: 1, y: 120 }, { y: 0, duration: 0.35, ease: "back.out(1.8)", immediateRender: false }, CONTANOS);
      tl.fromTo(q(".s13-txt"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.0, ease: "none", immediateRender: false }, CONTANOS + 0.3);
      tl.to(q(".s13-cursor"), { opacity: 0, duration: 0.3, yoyo: true, repeat: 9, ease: "steps(1)" }, CONTANOS + 0.3);
      tl.to(q(".s13-cual"), { scale: 1.05, duration: 0.25, yoyo: true, repeat: 1 }, COMENTARIOS);
''', sfx=[(0.0, "aplausos", 0.25, 1.5), (0.35, "impact-bass-1", 0.35, 0.5), (1.9, "pop", 0.3), (2.25, "typing", 0.25, 1.0), (3.4, "click", 0.25)])
