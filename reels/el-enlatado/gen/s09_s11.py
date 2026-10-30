import sys; sys.path.insert(0, "gen")
from escena import escena

# ---------- s09: round 4, llame al soporte, la espera ----------
escena("s09-soporte", 7.75, r'''
S .s09-soporte { top: 590px; font-size: 90px; color: #2f6bff; text-shadow: 0 0 34px rgba(47, 107, 255, 0.45); }
S .s09-ayuda { position: absolute; left: 330px; top: 760px; padding: 12px 24px; background: #f5f1e8; color: #0d0e14; border-radius: 24px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 52px; white-space: nowrap; }
S .s09-cal { position: absolute; left: 640px; top: 1110px; width: 300px; height: 190px; background: #f5f1e8; border-radius: 12px; border-top: 40px solid #e5383b; overflow: hidden; }
S .s09-dia { position: absolute; left: 0; right: 0; top: 46px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; color: #0d0e14; text-transform: uppercase; opacity: 0; }
S .s09-espera { position: absolute; left: 90px; top: 1400px; width: 900px; }
S .s09-espera .mono { font-size: 30px; color: #ffc531; }
S .s09-barra { margin-top: 12px; height: 26px; border: 4px solid #ffc531; border-radius: 14px; overflow: hidden; }
S .s09-relleno { height: 100%; width: 100%; background: #ffc531; transform-origin: 0 50%; transform: scaleX(0); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(540 860)"><g class="s09-tarjeta"></g></g>
          <g class="s09-sala">
            <g transform="translate(20 830) scale(0.98)"><g class="s09-duenio"></g></g>
            <g class="s09-tel"><rect x="246" y="905" width="44" height="110" rx="10" fill="#0d0e14" stroke="#f5f1e8" stroke-width="5" transform="rotate(-18 268 960)"/></g>
            <g class="s09-telar" fill="none" stroke="#f5f1e8" stroke-opacity="0.75" stroke-width="3">
              <path d="M30 720 L240 720 M30 720 L30 930 M30 720 L200 880 M30 720 L120 920 M30 720 L230 790"/>
              <path d="M80 720 Q70 760 30 770 M150 720 Q130 800 30 830 M220 720 Q190 840 30 890"/>
            </g>
            <g transform="translate(790 900)">
              <circle r="130" fill="#0d0e14" stroke="#f5f1e8" stroke-width="8"/>
              <g stroke="#f5f1e8" stroke-width="6" stroke-linecap="round"><path d="M0 -112 V-96 M0 112 V96 M-112 0 H-96 M112 0 H96"/></g>
              <path class="s09-horas" d="M0 0 V-60" stroke="#ffc531" stroke-width="12" stroke-linecap="round"/>
              <path class="s09-min" d="M0 0 V-96" stroke="#f5f1e8" stroke-width="7" stroke-linecap="round"/>
              <circle r="10" fill="#ffc531"/>
            </g>
          </g>
        </svg>
        <div class="txt s09-soporte">Llame al soporte</div>
        <div class="s09-ayuda">¿Hola? ¿Ayuda?</div>
        <div class="s09-cal"><div class="s09-dia s09-d0">Lunes</div><div class="s09-dia s09-d1">Martes</div><div class="s09-dia s09-d2">Miércoles</div><div class="s09-dia s09-d3">Jueves</div><div class="s09-dia s09-d4">Viernes</div></div>
        <div class="s09-espera"><div class="mono">EN ESPERA · NO CORTE</div><div class="s09-barra"><div class="s09-relleno"></div></div></div>
''', r'''
      q(".s09-tarjeta").innerHTML = K.tarjeta(4);
      q(".s09-duenio").innerHTML = K.duenio({ cara: "dolor" });
      const PIDE = 1.02, LLAME = 1.91, SOPORTE = 2.63, SU = 3.79, IMPORTANTE = 5.11;
      // ROUND 4
      tl.fromTo(q(".s09-tarjeta"), { opacity: 0.4, rotation: 12, scale: 1.5, svgOrigin: "0 0" }, { opacity: 1, rotation: 3, scale: 1, svgOrigin: "0 0", duration: 0.28, ease: "back.out(2)" }, 0);
      tl.to(q(".s09-tarjeta"), { opacity: 0, y: -260, duration: 0.25, ease: "power3.in" }, PIDE - 0.3);
      // el dueño con el teléfono pide ayuda
      gsap.set(q(".s09-sala"), { opacity: 0 });
      tl.fromTo(q(".s09-sala"), { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, PIDE - 0.1);
      gsap.set([q(".s09-telar"), q(".s09-cal"), q(".s09-espera")], { opacity: 0 });
      tl.to([q(".s09-cal"), q(".s09-espera")], { opacity: 1, duration: 0.2 }, SU - 0.15);
      K.pop(tl, q(".s09-ayuda"), PIDE + 0.1);
      tl.to(q(".s09-ayuda"), { opacity: 0, duration: 0.15 }, LLAME);
      K.golpe(tl, q(".s09-soporte"), SOPORTE, 2.0);
      K.sacudir(tl, esc, SOPORTE + 0.05, 10);
      // la espera: reloj que vuela, los días pasan, telarañas, la barra que nunca llega
      tl.to(q(".s09-min"), { rotation: 360 * 9, svgOrigin: "0 0", duration: DUR - LLAME, ease: "none" }, LLAME);
      tl.to(q(".s09-horas"), { rotation: 360 * 2, svgOrigin: "0 0", duration: DUR - LLAME, ease: "none" }, LLAME);
      const dias = [".s09-d0", ".s09-d1", ".s09-d2", ".s09-d3", ".s09-d4"];
      dias.forEach((d, i) => {
        const t = SU + i * 0.75;
        tl.fromTo(q(d), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.15, immediateRender: false }, t);
        if (i < dias.length - 1) tl.to(q(d), { opacity: 0, y: -40, duration: 0.15 }, t + 0.7);
      });
      tl.to(q(".s09-soporte"), { opacity: 0.3, duration: 0.3 }, SU);
      tl.fromTo(q(".s09-relleno"), { scaleX: 0 }, { scaleX: 0.92, duration: 1.4, ease: "power1.out" }, SU);
      tl.to(q(".s09-relleno"), { scaleX: 0.06, duration: 0.12 }, IMPORTANTE + 0.1);
      tl.to(q(".s09-relleno"), { scaleX: 0.7, duration: 2.2, ease: "power1.out" }, IMPORTANTE + 0.3);
      tl.to(q(".s09-telar"), { opacity: 1, duration: 1.2 }, IMPORTANTE);
      tl.to(q(".s09-duenio"), { y: 30, duration: 1.8, ease: "sine.inOut" }, IMPORTANTE);
      tl.to(q(".s09-tel"), { y: 30, duration: 1.8, ease: "sine.inOut" }, IMPORTANTE);
''', sfx=[(0.0, "campana", 0.5), (1.0, "click-soft", 0.3), (1.85, "beep", 0.3, 0.5), (2.6, "impact-bass-1", 0.35, 0.5), (3.4, "espera", 0.35), (5.2, "glitch-2", 0.2, 0.3), (7.2, "espera", 0.25, 0.6)])

# ---------- s10: contra las cuerdas, el sistema lo maneja como marioneta ----------
escena("s10-cuerdas", 4.22, r'''
S .s10-cuerdas { top: 596px; font-size: 80px; color: #e5383b; text-shadow: 0 0 34px rgba(229, 56, 59, 0.4); }
S .s10-quiere { position: absolute; left: 0; right: 0; top: 1410px; text-align: center; }
S .s10-quiere span { display: inline-block; padding: 10px 26px; border: 6px solid #2f6bff; border-radius: 12px; background: #0d0e14; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 64px; color: #2f6bff; text-transform: uppercase; white-space: nowrap; }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(560 740) scale(0.9)"><g class="s10-robot"></g></g>
          <g transform="translate(60 840)"><g class="s10-duenio"></g></g>
          <g class="s10-cruz"><path d="M150 640 H380 M265 600 V700" stroke="#2f6bff" stroke-width="16" stroke-linecap="round"/><path class="s10-vara" d="M380 640 L600 880" stroke="#f5f1e8" stroke-opacity="0.8" stroke-width="8"/></g>
          <g class="s10-sogas" fill="none" stroke="#f5f1e8" stroke-width="9" stroke-linecap="round">
            <path class="s10-s1" d="M0 1010 Q160 1010 520 1010" /><path class="s10-s2" d="M0 1110 Q160 1110 520 1110" /><path class="s10-s3" d="M0 1210 Q160 1210 520 1210" />
          </g>
        </svg>
        <div class="txt s10-cuerdas">Contra las cuerdas</div>
        <div class="s10-quiere"><span>Como él quiere</span></div>
''', r'''
      q(".s10-robot").innerHTML = K.enlatado({ pantalla: ["EMPUJAR", "ASÍ NO", "ASÍ"] });
      q(".s10-duenio").innerHTML = K.duenio({ cara: "dolor" });
      // hilos de marioneta: se cuelgan de cada guante y de la cabeza del dueño
      const NS = "http://www.w3.org/2000/svg";
      const hilo = (sel, d) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("class", "s10-hilo"); p.setAttribute("stroke", "#f5f1e8"); p.setAttribute("stroke-width", "3"); p.setAttribute("fill", "none"); q(".s10-duenio " + sel).appendChild(p); };
      hilo(".k-d-brazoI", "M112 150 V-200");
      hilo(".k-d-brazoD", "M288 150 V-200");
      hilo(".k-d-cabeza", "M200 76 V-240");
      const CUERDAS = 0.41, SISTEMA = 1.48, OBLIGA = 1.97, COMO = 2.46, QUIERE = 3.12;
      // el enlatado lo empuja contra las cuerdas (las sogas se doblan)
      tl.fromTo(q(".s10-duenio"), { x: 120 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      tl.fromTo(q(".s10-robot"), { x: 120 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      [[".s10-s1", 1010], [".s10-s2", 1110], [".s10-s3", 1210]].forEach(([s, y], i) => {
        tl.to(q(s), { attr: { d: `M0 ${y} Q${200 - i * 20} ${y + 40} 520 ${y}` }, duration: 0.25, ease: "power2.out" }, CUERDAS - 0.1);
      });
      K.golpe(tl, q(".s10-cuerdas"), CUERDAS);
      K.sacudir(tl, esc, CUERDAS + 0.05, 14);
      // "el sistema lo obliga": aparece la cruz de marioneta y los hilos
      tl.to(q(".s10-cuerdas"), { opacity: 0, duration: 0.2 }, SISTEMA - 0.25);
      gsap.set([q(".s10-cruz")], { opacity: 0 });
      qa(".s10-hilo").forEach((h) => gsap.set(h, { opacity: 0 }));
      tl.fromTo(q(".s10-cruz"), { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)", immediateRender: false }, SISTEMA - 0.1);
      qa(".s10-hilo").forEach((h) => tl.to(h, { opacity: 0.85, duration: 0.15 }, SISTEMA + 0.15));
      K.pantalla(tl, q(".s10-robot"), 1, SISTEMA);
      // lo maneja: brazos arriba y abajo a destiempo
      for (let k = 0; k < 6; k++) {
        const t = OBLIGA + k * 0.32;
        tl.to(q(".s10-cruz"), { rotation: k % 2 ? 10 : -10, svgOrigin: "265 640", duration: 0.16, ease: "sine.inOut" }, t);
        tl.to(q(".s10-duenio .k-d-brazoI"), { y: k % 2 ? 0 : -70, duration: 0.16, ease: "sine.inOut" }, t);
        tl.to(q(".s10-duenio .k-d-brazoD"), { y: k % 2 ? -70 : 0, duration: 0.16, ease: "sine.inOut" }, t);
        tl.to(q(".s10-duenio .k-d-cabeza"), { rotation: k % 2 ? 8 : -8, svgOrigin: "200 210", duration: 0.16 }, t);
      }
      K.pantalla(tl, q(".s10-robot"), 2, COMO);
      K.golpe(tl, q(".s10-quiere"), QUIERE, 2.0);
      K.sacudir(tl, esc, QUIERE + 0.05, 10);
''', sfx=[(0.3, "impact-bass-2", 0.4, 0.6), (0.45, "uuh", 0.3, 1.0), (1.4, "whoosh", 0.25), (2.0, "click", 0.25), (2.32, "click", 0.25), (2.64, "click", 0.25), (2.96, "click", 0.25), (3.05, "impact-bass-1", 0.4, 0.5)])

# ---------- s11: el entrenador: "¡cambiá de rincón!" ----------
escena("s11-entrenador", 5.53, r'''
S .s11-para { top: 590px; font-size: 96px; color: #f5f1e8; }
S .s11-bien { left: 600px; top: 760px; font-size: 54px; color: #ffc531; transform: rotate(6deg); }
S .s11-propio { position: absolute; left: 560px; top: 940px; width: 440px; text-align: center; }
S .s11-propio .mono { font-size: 34px; color: #2f6bff; }
S .s11-cambia { top: 1410px; font-size: 84px; color: #5ce611; text-shadow: 0 0 36px rgba(92, 230, 17, 0.4); }
''', r'''
        <svg class="esc-svg" viewBox="0 0 1080 1920" aria-hidden="true">
          <g transform="translate(20 840) scale(1.12)"><g class="s11-entre"></g></g>
          <g class="s11-pelea">
            <g transform="translate(600 1010) scale(0.42)"><g class="s11-duenio"></g></g>
            <g transform="translate(800 1000) scale(0.4)"><g class="s11-espejo"></g></g>
          </g>
          <rect class="s11-verde" x="980" y="560" width="40" height="780" rx="8" fill="#5ce611"/>
          <path class="s11-flecha" d="M150 1300 Q540 1180 950 1240" stroke="#5ce611" stroke-width="14" fill="none" stroke-linecap="round"/>
          <path class="s11-punta" d="M895 1205 L955 1240 L900 1285" stroke="#5ce611" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="txt s11-para">¡Pará, campeón!</div>
        <div class="sello s11-bien">Pegás bien</div>
        <div class="s11-propio"><div class="mono">TU PROPIO SISTEMA</div></div>
        <div class="txt s11-cambia">Cambiá de rincón</div>
''', r'''
      q(".s11-entre").innerHTML = K.entrenador();
      q(".s11-duenio").innerHTML = K.duenio({ cara: "grito" });
      q(".s11-espejo").innerHTML = K.enlatado({ pantalla: ["TU SISTEMA"], tam: 26 });
      const CAMPEON = 0.14, PEGAS = 1.09, DEJA = 2.19, PROPIO = 3.18, CAMBIA = 3.96, RINCON = 4.22;
      tl.fromTo(q(".s11-entre"), { y: 60 }, { y: 0, duration: 0.3, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s11-entre .k-t-boca"), { scaleY: 0.6, svgOrigin: "200 236" }, { scaleY: 1.5, svgOrigin: "200 236", duration: 0.14, yoyo: true, repeat: 31, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s11-entre .k-t-brazo"), { rotation: -6, svgOrigin: "292 320" }, { rotation: 8, svgOrigin: "292 320", duration: 0.3, yoyo: true, repeat: 13, ease: "sine.inOut" }, 0);
      K.golpe(tl, q(".s11-para"), CAMPEON + 0.05);
      K.sacudir(tl, esc, CAMPEON + 0.1, 12);
      K.golpe(tl, q(".s11-bien"), PEGAS + 0.1, 2.2);
      // el dueño le pega a su propio sistema (que es el enlatado)
      gsap.set(q(".s11-pelea"), { opacity: 0 });
      tl.to(q(".s11-pelea"), { opacity: 1, duration: 0.2 }, DEJA - 0.1);
      tl.to(q(".s11-bien"), { opacity: 0, duration: 0.15 }, DEJA - 0.1);
      for (let k = 0; k < 4; k++) {
        const t = DEJA + 0.1 + k * 0.3;
        tl.to(q(".s11-duenio .k-d-brazoD"), { x: 70, duration: 0.08, yoyo: true, repeat: 1 }, t);
        tl.to(q(".s11-espejo"), { x: 20, duration: 0.08, yoyo: true, repeat: 1 }, t + 0.06);
        tl.to(q(".s11-duenio"), { x: -14, duration: 0.08, yoyo: true, repeat: 1 }, t + 0.14);
      }
      K.golpe(tl, q(".s11-propio"), PROPIO, 1.8);
      // cambiá de rincón: aparece el rincón verde y la flecha
      tl.to([q(".s11-pelea"), q(".s11-propio"), q(".s11-para")], { opacity: 0.2, duration: 0.2 }, CAMBIA);
      gsap.set(q(".s11-verde"), { opacity: 0 });
      tl.fromTo(q(".s11-verde"), { opacity: 1, scaleY: 0, svgOrigin: "1000 1340" }, { scaleY: 1, svgOrigin: "1000 1340", duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, CAMBIA);
      K.dibujar(tl, q(".s11-flecha"), CAMBIA, 0.4);
      K.dibujar(tl, q(".s11-punta"), CAMBIA + 0.35, 0.15);
      K.golpe(tl, q(".s11-cambia"), RINCON);
      K.sacudir(tl, esc, RINCON + 0.05, 14);
''', sfx=[(0.05, "impact-bass-1", 0.4, 0.5), (1.15, "pop", 0.3), (2.3, "golpe", 0.35), (2.6, "golpe", 0.35), (2.9, "golpe", 0.35), (3.15, "impact-bass-1", 0.3, 0.5), (3.9, "whoosh-cinematic", 0.3, 0.8), (4.2, "impact-bass-2", 0.45, 0.6)])
