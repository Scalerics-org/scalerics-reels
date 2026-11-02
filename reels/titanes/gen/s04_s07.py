import sys; sys.path.insert(0, "gen")
from escena import escena

def round_js(px, n, color, tinta, t_num, t_fuera):
    # el cartel de round entra enorme y se va
    return f'''
      q(".{px}-round").innerHTML = K.cartelRound({n}, "{color}", "{tinta}");
      tl.fromTo(q(".{px}-round"), {{ scale: 1.8, rotation: -12, svgOrigin: "0 0" }}, {{ scale: 1, rotation: 0, svgOrigin: "0 0", duration: 0.25, ease: "back.out(1.8)" }}, 0);
      tl.to(q(".{px}-round"), {{ scale: 1.1, svgOrigin: "0 0", duration: 0.12, yoyo: true, repeat: 1 }}, {t_num});
      K.sacudir(tl, esc, {t_num} + 0.02, 12);
      tl.to(q(".{px}-round"), {{ opacity: 0, scale: 0.4, y: -300, svgOrigin: "0 0", duration: 0.3, ease: "power3.in" }}, {t_fuera});
'''

# ---------- s04: round 1, La Planilla ----------
escena("s04-planilla", 8.61, r'''
S .s04-nombre { top: 500px; font-size: 128px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(30 790) scale(0.8)"><g class="s04-du"></g></g>
          <g transform="translate(300 1010) scale(0.42)"><g class="s04-cel"></g></g>
          <g transform="translate(600 680) scale(0.88)"><g class="s04-rmov"><g class="s04-rival"></g></g></g>
          <g transform="translate(540 770) scale(0.75)"><g class="s04-hoja"></g></g>
          <g transform="translate(540 960)"><g class="s04-round"></g></g>
        </svg>
        <div class="cartel azul s04-nombre">¡La Planilla!</div>
''', round_js("s04", 1, "#ffd23f", "#0b0b12", 0.38, 1.0) + r'''
      q(".s04-du").innerHTML = K.duenio({ cara: "cansado" });
      q(".s04-cel").innerHTML = K.celular({ titulo: "Pedidos", colorBarra: "#2a5cff", globos: [["2 tortas", 0], ["1 pizza", 0], ["3 empanadas", 0], ["1 flan", 0], ["2 pizzas", 0]] });
      q(".s04-rival").innerHTML = K.luchador({ color: "#2a5cff", trim: "#ffd23f", emblema: "planilla", nombre: "LA PLANILLA", boca: "burla" });
      q(".s04-hoja").innerHTML = K.planilla();
      const du = q(".s04-du"), ri = q(".s04-rival");
      const DESDE = 1.2, LA = 3.04, PLANILLA = 3.59, PASAME = 4.84, FILAS = [6.3, 6.67, 7.0, 7.29, 7.59];
      // el dueño con el celular
      gsap.set([du, q(".s04-cel")], { opacity: 0 });
      tl.fromTo(du, { opacity: 1, y: 60 }, { y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, DESDE - 0.1);
      K.popSvg(tl, q(".s04-cel"), DESDE + 0.1);
      [0, 1, 2, 3, 4].forEach((i) => { gsap.set(q(".s04-cel .k-ce-g" + i), { opacity: 0 }); tl.to(q(".s04-cel .k-ce-g" + i), { opacity: 1, duration: 0.1 }, DESDE + 0.35 + i * 0.3); });
      // entra La Planilla
      gsap.set(q(".s04-rmov"), { x: 600 });
      tl.to(q(".s04-rmov"), { x: 0, duration: 0.45, ease: "power3.out" }, LA - 0.2);
      K.golpe(tl, q(".s04-nombre"), PLANILLA + 0.05);
      K.sacudir(tl, esc, PLANILLA + 0.06, 14);
      tl.to(q(".s04-rival .k-l-brazoD"), { rotation: -25, svgOrigin: "322 262", duration: 0.2, yoyo: true, repeat: 3 }, PLANILLA + 0.1);
      K.cara(tl, du, "dolor", PLANILLA);
      // "pasame los pedidos": la hoja, y él señala
      tl.to(q(".s04-nombre"), { opacity: 0, y: -30, duration: 0.2 }, PASAME - 0.3);
      K.popSvg(tl, q(".s04-hoja"), PASAME);
      for (let i = 1; i <= 5; i++) gsap.set(q(".s04-hoja .k-pl-f" + i), { opacity: 0 });
      tl.to(q(".s04-rival .k-l-brazoI"), { rotation: -40, svgOrigin: "118 262", duration: 0.25, ease: "back.out(2)" }, PASAME + 0.1);
      K.cara(tl, du, "cansado", PASAME + 0.3);
      K.cara(tl, ri, "risa", PASAME + 0.4, "k-l-boca");
      // uno por uno, fila por fila: cada fila es un golpe chiquito
      FILAS.forEach((t, i) => {
        tl.to(q(".s04-hoja .k-pl-f" + (i + 1)), { opacity: 1, duration: 0.06 }, t);
        tl.to(q(".s04-cel .k-ce-g" + i), { opacity: 0.25, duration: 0.1 }, t);
        tl.fromTo(du, { y: 0 }, { y: 14, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, t);
        tl.fromTo(q(".s04-rival .k-l-brazoI"), { rotation: -40 }, { rotation: -55, svgOrigin: "118 262", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, t);
      });
      tl.to(q(".s04-du .k-d-sudor"), { opacity: 1, duration: 0.1 }, 6.4);
      tl.fromTo(q(".s04-du .k-d-sudor"), { y: 0 }, { y: 50, duration: 1.4, ease: "power1.in", immediateRender: false }, 6.4);
      K.cara(tl, du, "dolor", FILAS[4]);
''', sfx=[(0.0, "campana", 0.45), (0.35, "impact-bass-1", 0.35, 0.5), (1.5, "notification", 0.25), (2.1, "notification", 0.2), (2.9, "whoosh", 0.3, 0.6), (3.55, "golpe", 0.5), (3.6, "uuh", 0.3, 1.2), (4.84, "pop", 0.3), (6.3, "key-press", 0.3), (6.67, "key-press", 0.3), (7.0, "key-press", 0.3), (7.29, "key-press", 0.3), (7.59, "key-press", 0.35)])

# ---------- s05: round 2, El Copia-Pega ----------
escena("s05-copia-pega", 6.59, r'''
S .s05-nombre { top: 500px; font-size: 112px; }
S .s05-tecla { position: absolute; left: 340px; top: 470px; width: 400px; height: 150px; display: flex; align-items: center; justify-content: center; background: #f4efe2; border: 8px solid #0b0b12; border-radius: 22px; box-shadow: 0 16px 0 #0b0b12; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 84px; color: #0b0b12; letter-spacing: 0.04em; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 680) scale(0.85)"><g class="s05-clon"></g></g>
          <g transform="translate(620 680) scale(0.85)"><g class="s05-rmov"><g class="s05-rival"></g></g></g>
          <rect class="s05-sel1" x="610" y="660" width="400" height="640" rx="10" fill="none" stroke="#f4efe2" stroke-width="6" stroke-dasharray="22 16"/>
          <rect class="s05-sel2" x="30" y="660" width="400" height="640" rx="10" fill="none" stroke="#f4efe2" stroke-width="6" stroke-dasharray="22 16"/>
          <g transform="translate(390 830) scale(0.72)"><g class="s05-du"></g></g>
          <g transform="translate(540 960) scale(0.85)"><g class="s05-doble"></g></g>
          <g transform="translate(540 960)"><g class="s05-round"></g></g>
        </svg>
        <div class="cartel s05-nombre">¡El Copia-Pega!</div>
        <div class="s05-tecla s05-c">CTRL+C</div>
        <div class="s05-tecla s05-v">CTRL+V</div>
''', round_js("s05", 2, "#e8332a", "#0b0b12", 0.38, 0.85) + r'''
      const L = { color: "#ffd23f", trim: "#e8332a", emblema: "copia", nombre: "COPIA-PEGA", tamNombre: 20, boca: "burla" };
      q(".s05-rival").innerHTML = K.luchador(L);
      q(".s05-clon").innerHTML = K.luchador(L);
      q(".s05-du").innerHTML = K.duenio({ cara: "cansado" });
      q(".s05-doble").innerHTML = K.estallido("¡DOBLE!", "#e8332a", "#0b0b12", 60);
      const du = q(".s05-du");
      const EL = 0.92, NOMBRE = 1.07, C1 = 2.29, V1 = 3.43, C2 = 4.42, V2 = 5.45;
      gsap.set([q(".s05-clon"), q(".s05-sel1"), q(".s05-sel2"), q(".s05-c"), q(".s05-v"), du], { opacity: 0 });
      gsap.set(q(".s05-rmov"), { x: 500 });
      tl.to(q(".s05-rmov"), { x: 0, duration: 0.4, ease: "power3.out" }, EL - 0.2);
      tl.to(du, { opacity: 1, duration: 0.2 }, EL);
      K.golpe(tl, q(".s05-nombre"), NOMBRE + 0.05);
      K.sacudir(tl, esc, NOMBRE + 0.06, 12);
      tl.to(q(".s05-nombre"), { opacity: 0, duration: 0.2 }, C1 - 0.25);
      // las teclas, una por palabra
      const tecla = (sel, t, fin) => {
        tl.fromTo(q(sel), { opacity: 1, y: -30, scale: 1.3 }, { y: 0, scale: 1, duration: 0.14, ease: "power4.in", immediateRender: false }, t - 0.1);
        tl.to(q(sel), { y: 14, duration: 0.06, yoyo: true, repeat: 1 }, t + 0.06);
        tl.to(q(sel), { opacity: 0, duration: 0.12 }, fin - 0.15);
      };
      tecla(".s05-c", C1, V1); tecla(".s05-v", V1, C2); tecla(".s05-c", C2, V2); tecla(".s05-v", V2, DUR);
      // copiar: lo selecciona; pegar: aparece el clon
      tl.to(q(".s05-sel1"), { opacity: 1, duration: 0.05 }, C1);
      tl.fromTo(q(".s05-sel1"), { strokeDashoffset: 0 }, { strokeDashoffset: -152, duration: 1.1, ease: "none", immediateRender: false }, C1);
      tl.to(q(".s05-sel1"), { opacity: 0, duration: 0.1 }, V1 - 0.1);
      tl.fromTo(q(".s05-clon"), { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, V1);
      K.sacudir(tl, esc, V1 + 0.25, 12);
      K.cara(tl, du, "dolor", V1 + 0.2);
      tl.to(q(".s05-sel2"), { opacity: 1, duration: 0.05 }, C2);
      tl.fromTo(q(".s05-sel2"), { strokeDashoffset: 0 }, { strokeDashoffset: -152, duration: 1.0, ease: "none", immediateRender: false }, C2);
      tl.to(q(".s05-sel2"), { opacity: 0, duration: 0.1 }, V2 - 0.1);
      // el segundo "pegar": doble golpe al dueño, sándwich
      tl.to(q(".s05-clon .k-l-brazoD"), { rotation: 50, svgOrigin: "322 262", duration: 0.12, ease: "power4.in" }, V2 - 0.1);
      tl.to(q(".s05-rival .k-l-brazoI"), { rotation: -50, svgOrigin: "118 262", duration: 0.12, ease: "power4.in" }, V2 - 0.1);
      K.popSvg(tl, q(".s05-doble"), V2 + 0.05);
      K.cara(tl, du, "ko", V2 + 0.05);
      tl.to(du, { scaleX: 0.8, svgOrigin: "200 632", duration: 0.1 }, V2 + 0.02);
      K.sacudir(tl, esc, V2 + 0.06, 20);
      K.cara(tl, q(".s05-rival"), "risa", V2 + 0.2, "k-l-boca");
      K.cara(tl, q(".s05-clon"), "risa", V2 + 0.2, "k-l-boca");
''', sfx=[(0.0, "campana", 0.45), (0.35, "impact-bass-1", 0.35, 0.5), (1.0, "golpe", 0.4), (2.25, "key-press", 0.45), (3.4, "key-press", 0.45), (3.55, "pop", 0.3), (4.38, "key-press", 0.45), (5.42, "golpe", 0.6), (5.48, "uuh", 0.3, 1.1)])

# ---------- s06: round 3, El Recordatorio ----------
escena("s06-recordatorio", 8.12, r'''
S .s06-nombre { top: 510px; font-size: 84px; }
S .s06-postit { position: absolute; width: 270px; padding: 18px 16px; background: #ffd23f; border: 5px solid #0b0b12; box-shadow: 8px 8px 0 #0b0b12; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 30px; line-height: 1.15; color: #0b0b12; text-align: center; }
S .s06-p1 { left: 70px; top: 760px; transform: rotate(-7deg); }
S .s06-p2 { left: 120px; top: 1010px; transform: rotate(5deg); background: #f4efe2; }
S .s06-postit b { display: block; font-weight: 900; font-size: 38px; color: #e8332a; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(70 800) scale(0.78)"><g class="s06-du"></g></g>
          <g transform="translate(610 680) scale(0.86)"><g class="s06-rmov"><g class="s06-rival"></g></g></g>
          <g transform="translate(560 760) scale(0.62)"><g class="s06-reloj"></g></g>
          <g transform="translate(540 960)"><g class="s06-round"></g></g>
        </svg>
        <div class="cartel rojo s06-nombre">¡El Recordatorio!</div>
        <div class="s06-postit s06-p1"><b>10:00</b>turno sin confirmar</div>
        <div class="s06-postit s06-p2"><b>GÓMEZ</b>debe desde marzo</div>
''', round_js("s06", 3, "#2a5cff", "#f4efe2", 0.77, 1.4) + r'''
      q(".s06-du").innerHTML = K.duenio({ cara: "cansado" });
      q(".s06-rival").innerHTML = K.luchador({ color: "#e8332a", trim: "#f4efe2", emblema: "reloj", nombre: "RECORDATORIO", tamNombre: 17, boca: "burla" });
      q(".s06-reloj").innerHTML = K.reloj({ color: "#2a5cff" });
      const du = q(".s06-du"), rel = q(".s06-reloj");
      const EL = 1.68, NOMBRE = 1.92, DIEZ = 3.79, CONFIRMO = 4.46, GOMEZ = 5.62, MARZO = 6.96;
      gsap.set([du, rel], { opacity: 0 });
      gsap.set(q(".s06-rmov"), { x: 520 });
      tl.to(q(".s06-rmov"), { x: 0, duration: 0.4, ease: "power3.out" }, EL - 0.2);
      tl.to(du, { opacity: 1, duration: 0.2 }, EL);
      K.golpe(tl, q(".s06-nombre"), NOMBRE + 0.1);
      K.sacudir(tl, esc, NOMBRE + 0.12, 12);
      tl.to(q(".s06-nombre"), { opacity: 0, duration: 0.2 }, 3.05);
      // el despertador suena encima del dueño
      K.popSvg(tl, rel, 3.1);
      tl.to(q(".s06-reloj .k-rj-m"), { rotation: 360, svgOrigin: "0 0", duration: 4.8, ease: "none" }, 3.1);
      tl.to(q(".s06-reloj .k-rj-h"), { rotation: 60, svgOrigin: "0 0", duration: 4.8, ease: "none" }, 3.1);
      const sonar = (t) => tl.fromTo(rel, { rotation: -8 }, { rotation: 8, svgOrigin: "0 0", duration: 0.05, yoyo: true, repeat: 9, ease: "none", immediateRender: false }, t);
      sonar(DIEZ - 0.2); sonar(GOMEZ - 0.1);
      // los post-its que le pega en la frente
      const pega = (sel, t) => {
        gsap.set(q(sel), { opacity: 0 });
        tl.fromTo(q(sel), { opacity: 1, scale: 2.2, x: 300 }, { scale: 1, x: 0, duration: 0.18, ease: "power4.in", immediateRender: false }, t - 0.18);
        tl.to(q(".s06-rival .k-l-brazoI"), { rotation: -60, svgOrigin: "118 262", duration: 0.1, yoyo: true, repeat: 1 }, t - 0.15);
        tl.fromTo(du, { x: 0 }, { x: -20, duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, t);
      };
      pega(".s06-p1", CONFIRMO);
      K.cara(tl, du, "dolor", CONFIRMO);
      pega(".s06-p2", MARZO);
      K.cara(tl, du, "grito", MARZO);
      K.cara(tl, q(".s06-rival"), "risa", MARZO + 0.15, "k-l-boca");
      tl.to(q(".s06-du .k-d-sudor"), { opacity: 1, duration: 0.1 }, 5.2);
      tl.fromTo(q(".s06-du .k-d-sudor"), { y: 0 }, { y: 50, duration: 1.4, ease: "power1.in", immediateRender: false }, 5.2);
''', sfx=[(0.0, "campana", 0.45), (0.75, "impact-bass-1", 0.35, 0.5), (1.85, "golpe", 0.4), (3.1, "pop", 0.25), (3.6, "beep", 0.2, 0.8), (4.4, "golpe", 0.35), (5.5, "beep", 0.2, 0.8), (6.9, "golpe", 0.45), (7.0, "uuh", 0.3, 1.0)])

# ---------- s07: el golpe final, Tu Pedido Está Listo ----------
escena("s07-listo", 6.58, r'''
S .s07-final { top: 470px; font-size: 92px; }
S .s07-l1 { top: 470px; font-size: 120px; }
S .s07-l2 { top: 590px; font-size: 120px; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(40 800) scale(0.78)"><g class="s07-du"></g></g>
          <g transform="translate(610 690) scale(0.86)"><g class="s07-rmov"><g class="s07-rival"></g></g></g>
          <g transform="translate(440 990) scale(0.72)"><g class="s07-cel"></g></g>
        </svg>
        <div class="cartel rojo s07-final">¡Golpe final!</div>
        <div class="cartel s07-l1 s07-a">Tu pedido</div>
        <div class="cartel s07-l2 s07-b">está listo</div>
''', r'''
      q(".s07-du").innerHTML = K.duenio({ cara: "cansado" });
      q(".s07-rival").innerHTML = K.luchador({ color: "#0b0b12", trim: "#ffd23f", emblema: "listo", nombre: "¡ESTÁ LISTO!", boca: "burla" });
      q(".s07-cel").innerHTML = K.celular({ titulo: "Clientes", colorBarra: "#2a5cff", colorMio: "#2a5cff", globos: [["¡Está listo!", 1], ["¡Está listo!", 1], ["¡Está listo!", 1], ["¡Está...", 1]] });
      const du = q(".s07-du");
      const GOLPE = 0.2, TU = 1.22, PEDIDO = 1.36, ESTA = 1.96, LISTO = 2.37, H1 = 2.97, H2 = 4.9;
      // el último rival ya está en el ring, enorme, a contraluz
      tl.fromTo(q(".s07-rmov"), { scale: 1.15, svgOrigin: "220 692" }, { scale: 1, svgOrigin: "220 692", duration: 1.0, ease: "power2.out" }, 0);
      gsap.set([du, q(".s07-cel")], { opacity: 0 });
      K.golpe(tl, q(".s07-final"), GOLPE + 0.1);
      tl.to(q(".s07-final"), { opacity: 0, duration: 0.15 }, TU - 0.2);
      K.golpe(tl, q(".s07-a"), PEDIDO, 2.0);
      K.golpe(tl, q(".s07-b"), LISTO, 2.0);
      K.sacudir(tl, esc, LISTO + 0.02, 16);
      tl.to(q(".s07-rival .k-l-brazoD"), { rotation: -30, svgOrigin: "322 262", duration: 0.2, yoyo: true, repeat: 1 }, ESTA);
      tl.to(q(".s07-rival .k-l-brazoI"), { rotation: 30, svgOrigin: "118 262", duration: 0.2, yoyo: true, repeat: 1 }, ESTA);
      // "hola, tu pedido está listo": el dueño escribe uno por uno
      tl.to([q(".s07-a"), q(".s07-b")], { opacity: 0, duration: 0.2 }, H1 - 0.3);
      tl.to(du, { opacity: 1, duration: 0.2 }, H1 - 0.3);
      K.popSvg(tl, q(".s07-cel"), H1 - 0.2);
      [0, 1, 2, 3].forEach((i) => gsap.set(q(".s07-cel .k-ce-g" + i), { opacity: 0 }));
      [H1 + 0.2, 4.38, H2 + 0.1, 5.7].forEach((t, i) => {
        tl.fromTo(q(".s07-cel .k-ce-g" + i), { opacity: 1, scale: 0.6, svgOrigin: "120 " + (-140 + i * 84) }, { scale: 1, svgOrigin: "120 " + (-140 + i * 84), duration: 0.18, ease: "back.out(2)", immediateRender: false }, t);
      });
      // cada vez más agotado, y el rival le aplica una llave
      K.cara(tl, du, "dolor", 4.4);
      tl.to(q(".s07-rmov"), { x: -170, duration: 0.5, ease: "power2.inOut" }, 4.6);
      tl.to(q(".s07-rival .k-l-brazoI"), { rotation: -70, svgOrigin: "118 262", duration: 0.3 }, 4.8);
      tl.to(du, { rotation: -8, svgOrigin: "200 632", duration: 0.6, ease: "power2.in" }, 5.4);
      K.cara(tl, du, "ko", 5.9);
      tl.to(q(".s07-du .k-d-sudor"), { opacity: 1, duration: 0.1 }, 4.0);
      tl.fromTo(q(".s07-du .k-d-sudor"), { y: 0 }, { y: 50, duration: 1.6, ease: "power1.in", immediateRender: false }, 4.0);
''', sfx=[(0.0, "redoble", 0.35), (0.25, "impact-bass-2", 0.4, 0.6), (1.3, "golpe", 0.35), (2.3, "golpe", 0.5), (2.35, "aplausos", 0.2, 1.0), (3.15, "notification", 0.25), (4.38, "notification", 0.25), (5.0, "notification", 0.25), (5.7, "notification", 0.2)])
