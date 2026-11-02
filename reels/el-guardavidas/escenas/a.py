import sys; sys.path.insert(0,'escenas')
from mk import mk

# ---------- s03 programa: la apertura de la serie
mk("s03-programa", 5.85, """
.s03-titulo { position: absolute; left: 90px; top: 1350px; width: 900px; padding: 18px 0 14px; background: #e5484d; border: 8px solid #10202b; border-radius: 18px; box-shadow: 8px 8px 0 rgba(16,32,43,0.35); text-align: center; }
.s03-titulo b { display: block; font-family: "Black Ops One", sans-serif; font-weight: 400; font-size: 84px; line-height: 1; color: #ffc93c; letter-spacing: 0.03em; text-shadow: 4px 4px 0 #10202b; white-space: nowrap; }
.s03-titulo small { display: block; margin-top: 8px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; letter-spacing: 0.3em; color: #fff6e3; white-space: nowrap; }
.s03-lenta { left: 640px; top: 640px; }
.s03-bolsa-t { left: 820px; top: 1180px; font-size: 26px; padding: 8px 14px 6px; }
""", """
        <div class="s03-titulo"><b>GUARDAVIDAS</b><small>DE LA RAMBLA · LA SERIE</small></div>
        <div class="pl-tag rojo s03-lenta">CÁMARA LENTA</div>
""", r"""
      // rayos de sol de apertura de serie, el guardavidas canchero, el termo y la bolsa de bizcochos
      let rayos = "";
      for (let k = 0; k < 14; k++) { const a = (k / 14) * Math.PI * 2; rayos += `<path d="M540 980 L${540 + Math.cos(a) * 900} ${980 + Math.sin(a) * 900} L${540 + Math.cos(a + 0.18) * 900} ${980 + Math.sin(a + 0.18) * 900} Z" fill="${PL.AMA}" opacity="0.28"/>`; }
      svg.innerHTML = `<g class="s03-rayos">${rayos}</g>` +
        `<g class="s03-g">${PL.guardavidas(540, 1340, 1.22, { cara: "canchero" })}</g>` +
        `<g class="s03-brillo"><path d="M720 700 l12 34 l34 12 l-34 12 l-12 34 l-12 -34 l-34 -12 l34 -12 Z" fill="${PL.CRE}" stroke="${PL.INK}" stroke-width="4"/></g>` +
        PL.termo(150, 1330, 1.1, { cls: "s03-termo", rot: -6 }) +
        `<g class="s03-bolsa"><path d="M840 1330 L830 1150 L1000 1150 L990 1330 Z" fill="${PL.ARENA}" stroke="${PL.INK}" stroke-width="7" stroke-linejoin="round"/>
          <path d="M830 1150 L850 1120 L980 1120 L1000 1150" fill="${PL.ARENA2}" stroke="${PL.INK}" stroke-width="7" stroke-linejoin="round"/>
          <ellipse cx="880" cy="1130" rx="34" ry="18" fill="#e0a85c" stroke="${PL.INK}" stroke-width="5"/><ellipse cx="940" cy="1124" rx="34" ry="18" fill="#e0a85c" stroke="${PL.INK}" stroke-width="5"/></g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const GUARDA = 0.80, COMO = 2.47, TERMO = 4.27, BIZ = 4.67;
      K.origen(q(".s03-rayos"), "540 980");
      tl.fromTo(q(".s03-rayos"), { rotation: 0, opacity: 0.6 }, { rotation: 40, opacity: 1, duration: DUR, ease: "none", svgOrigin: "540 980" }, 0);
      K.popSvg(q(".s03-g"), 0, "540 1340", 0.4, 0.7);
      // título en "Guardavidas"
      K.sello(q(".s03-titulo"), GUARDA, -2);
      // cámara lenta: sube despacito, el jopo brilla
      tl.fromTo(q(".s03-g"), { y: 0 }, { y: -40, duration: 1.4, ease: "sine.inOut", immediateRender: false }, COMO);
      K.pop(q(".s03-lenta"), COMO);
      tl.to(q(".s03-lenta"), { opacity: 0.4, duration: 0.3, yoyo: true, repeat: 3, ease: "steps(1)" }, COMO + 0.4);
      K.popSvg(q(".s03-brillo"), COMO + 0.4, "720 746", 0.3, 0.2);
      tl.to(q(".s03-brillo"), { rotation: 90, svgOrigin: "720 746", duration: 1.2, ease: "none" }, COMO + 0.4);
      tl.to(q(".s03-brillo"), { opacity: 0, duration: 0.2 }, COMO + 1.6);
      tl.to(q(".s03-lenta"), { opacity: 0, duration: 0.2 }, TERMO - 0.3);
      K.popSvg(q(".s03-termo"), TERMO, "150 1330", 0.4, 0.2);
      K.popSvg(q(".s03-bolsa"), BIZ, "915 1330", 0.4, 0.2);
""", [{"t":0.0,"sfx":"riser","vol":0.25,"max":0.9},{"t":0.8,"sfx":"impact-bass-1","vol":0.35,"max":0.8},{"t":2.47,"sfx":"sparkle","vol":0.3},{"t":4.27,"sfx":"pop","vol":0.3},{"t":4.67,"sfx":"pop","vol":0.3}])

# ---------- s04 prismaticos
mk("s04-prismaticos", 5.32, """
.s04-tag { left: 90px; top: 1390px; }
.s04-dress { left: 0; top: 0; }
""", """
        <div class="pl-tag rojo s04-tag">ATENCIÓN, TORRE</div>
""", r"""
      const [gl] = PL.globo(110, 640, ["Hola, ¿tienen el vestido", "azul en talle M?"], "i", { fs: 40, cls: "s04-gl", hora: "15:40" });
      svg.innerHTML =
        `<g class="s04-g">${PL.guardavidas(540, 1340, 1.15, { brazo: "prismaticos", cara: "serio" })}</g>` +
        `<defs><clipPath id="s04-vista"><circle cx="365" cy="1000" r="300"/><circle cx="715" cy="1000" r="300"/></clipPath></defs>` +
        `<g class="s04-vista"><g clip-path="url(#s04-vista)">
           <rect x="0" y="600" width="1080" height="800" fill="${PL.TUR}"/>
           <rect x="0" y="600" width="1080" height="150" fill="${PL.CEL}"/>
           ${PL.olas(760, { L: 170, amp: 14, h: 700, color: PL.TUR3, cls: "s04-o1", op: 0.5 })}
           <g class="s04-cli">${PL.clienta(560, 1170, 1.25, { cara: "feliz", mano: "celular", id: "s04-cc" })}</g>
           ${PL.olas(1210, { L: 200, amp: 18, h: 200, color: PL.TUR, cls: "s04-o2" })}
           <path d="M540 700 L540 760 M540 1240 L540 1300 M120 1000 L180 1000 M900 1000 L960 1000" stroke="${PL.INK}" stroke-width="5" opacity="0.5"/>
         </g>
         <circle cx="365" cy="1000" r="300" fill="none" stroke="${PL.INK}" stroke-width="22"/><circle cx="715" cy="1000" r="300" fill="none" stroke="${PL.INK}" stroke-width="22"/>
         <path d="M520 712 Q540 700 560 712 M520 1288 Q540 1300 560 1288" stroke="${PL.INK}" stroke-width="22" fill="none"/>
       </g>` +
        gl +
        `<g class="s04-vest"><path d="M890 860 L930 840 L950 870 L970 840 L1010 860 L995 900 L1030 1010 L870 1010 L905 900 Z" fill="#2b6fd6" stroke="${PL.INK}" stroke-width="6" stroke-linejoin="round"/>
          <rect x="990" y="790" width="64" height="58" rx="10" fill="${PL.AMA}" stroke="${PL.INK}" stroke-width="5"/><text data-layout-ignore x="1022" y="834" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="38" fill="${PL.INK}">M</text></g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const CLIENTA = 0.80, AGUA = 1.69, HOLA = 2.67, VESTIDO = 3.56, M = 4.46;
      K.popSvg(q(".s04-g"), 0, "540 1340", 0.35, 0.8);
      K.pop(q(".s04-tag"), 0.05);
      tl.fromTo(q(".s04-g"), { x: -20 }, { x: 20, duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 0.3);
      // la vista de los prismáticos
      K.popSvg(q(".s04-vista"), CLIENTA, "540 1000", 0.4, 0.4);
      tl.to(q(".s04-tag"), { opacity: 0, duration: 0.15 }, CLIENTA);
      K.olear(".s04-o1, .s04-o2", CLIENTA, DUR - CLIENTA, 170, 1.3);
      // barrido de prismáticos: busca y la encuentra
      tl.fromTo(q(".s04-cli"), { x: 260 }, { x: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, CLIENTA + 0.1);
      K.flotar(q(".s04-cli .pl-c-cuerpo"), AGUA, DUR - AGUA, 10);
      // el mensaje
      K.popSvg(q(".s04-gl"), HOLA, "300 700", 0.35, 0.5);
      K.popSvg(q(".s04-vest"), VESTIDO, "950 930", 0.35, 0.3);
      tl.fromTo(q(".s04-vest"), { rotation: -6 }, { rotation: 6, svgOrigin: "950 930", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, VESTIDO + 0.35);
""", [{"t":0.0,"sfx":"click","vol":0.3},{"t":0.8,"sfx":"whoosh","vol":0.25,"max":0.6},{"t":2.67,"sfx":"notification","vol":0.35},{"t":3.56,"sfx":"pop","vol":0.3}])

# ---------- s05 orilla
mk("s05-orilla", 3.42, """
.s05-tag { left: 600px; top: 640px; }
.s05-tag2 { left: 560px; top: 1390px; }
""", """
        <div class="pl-tag s05-tag">EN LA ORILLA</div>
        <div class="pl-tag verde s05-tag2">UN MENSAJE Y LISTO</div>
""", r"""
      svg.innerHTML =
        // la orilla: arena que entra en diagonal y la clienta en el agua bajita
        `<path d="M520 1300 Q700 1200 1100 1180 L1100 1400 L520 1400 Z" fill="${PL.ARENA}" stroke="${PL.INK}" stroke-width="6"/>
         <path d="M560 1280 Q720 1196 1100 1176" fill="none" stroke="${PL.CRE}" stroke-width="10" stroke-linecap="round" class="s05-esp"/>` +
        `<g class="s05-cli">${PL.clienta(820, 1120, 0.7, { cara: "duda", mano: "celular", id: "s05-cc" })}</g>` +
        `<g class="s05-dist"><path d="M820 960 L820 900 M1000 1150 L1000 900 M820 920 L1000 920" stroke="${PL.INK}" stroke-width="6" stroke-linecap="round"/>
           <path d="M836 908 L820 920 L836 932 M984 908 L1000 920 L984 932" fill="none" stroke="${PL.INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>` +
        `<g class="s05-g">${PL.guardavidas(270, 1340, 0.95, { brazo: "senala", cara: "canchero" })}</g>` +
        `<g class="s05-sv">${PL.salvavidas(0, 0, 70)}</g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const ORILLA = 1.05, MENSAJE = 1.94, SACAS = 2.50;
      K.popSvg(q(".s05-g"), 0, "270 1340", 0.35, 0.8);
      K.hablar(".s05-g .pl-g-boca", 0.05, 3, 0.12);
      K.popSvg(q(".s05-cli"), 0.15, "820 1120", 0.35, 0.6);
      K.flotar(q(".s05-cli .pl-c-cuerpo"), 0.3, DUR - 0.3, 8);
      K.pop(q(".s05-tag"), ORILLA);
      K.popSvg(q(".s05-dist"), ORILLA, "910 920", 0.3, 0.3);
      // el salvavidas sale de la mano del guardavidas y cae al lado de la clienta
      gsap.set(q(".s05-sv"), { x: 520, y: 980, opacity: 0 });
      tl.set(q(".s05-sv"), { opacity: 1 }, MENSAJE);
      tl.to(q(".s05-sv"), { x: 690, duration: 0.55, ease: "none" }, MENSAJE);
      tl.to(q(".s05-sv"), { y: 820, duration: 0.25, ease: "power2.out" }, MENSAJE);
      tl.to(q(".s05-sv"), { y: 1110, duration: 0.3, ease: "power2.in" }, MENSAJE + 0.25);
      tl.to(q(".s05-sv"), { rotation: 360, transformOrigin: "50% 50%", duration: 0.55, ease: "none" }, MENSAJE);
      tl.to(q(".s05-dist"), { opacity: 0, duration: 0.2 }, MENSAJE);
      K.pop(q(".s05-tag2"), SACAS);
""", [{"t":0.0,"sfx":"click-soft","vol":0.3},{"t":1.05,"sfx":"pop","vol":0.3},{"t":1.94,"sfx":"whoosh","vol":0.3,"max":0.6},{"t":2.5,"sfx":"correcta","vol":0.3}])

# ---------- s06 visto
mk("s06-visto", 5.25, """
.s06-visto { left: 560px; top: 760px; font-size: 96px; }
.s06-corr { left: 120px; top: 1390px; }
""", """
        <div class="pl-sello s06-visto">¡VISTO!</div>
        <div class="pl-tag rojo s06-corr">SE LA LLEVA LA CORRIENTE</div>
""", r"""
      const X = 250, Y = 610, W = 480, H = 700;
      const [m1] = PL.globo(X + 24, Y + 150, ["Hola, ¿tienen el vestido", "azul en talle M?"], "i", { fs: 27, hora: "15:40", visto: "gris", cls: "s06-m1" });
      const [m2] = PL.globo(X + 24, Y + 290, "¿Hola?", "i", { fs: 34, hora: "16:52", visto: "gris", cls: "s06-m2" });
      const [m3] = PL.globo(X + 24, Y + 400, "¿Hay alguien?", "i", { fs: 34, hora: "19:15", visto: "gris", cls: "s06-m3" });
      svg.innerHTML =
        `<g class="s06-cel">${PL.celular(X, Y, W, H, "s06-clip")}
          <g clip-path="url(#s06-clip)">${PL.chatCabecera(X, Y, W, "Tienda de Ropa", "en la reposera", PL.TUR3)}${m1}${m2}${m3}
            <rect x="${X}" y="${Y + H - 90}" width="${W}" height="90" fill="#e6dcc2"/>
            <rect x="${X + 20}" y="${Y + H - 70}" width="${W - 40}" height="50" rx="25" fill="#ffffff" stroke="${PL.INK}" stroke-width="3"/>
          </g>${PL.celularBorde(X, Y, W, H)}
          <g class="s06-tildes"><path d="M${X + 300} ${Y + 560} l30 30 l60 -70 M${X + 350} ${Y + 590} l60 -70" fill="none" stroke="#2b8be6" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/></g>
        </g>` +
        PL.olas(1200, { L: 200, amp: 26, h: 300, color: PL.TUR3, cls: "s06-o1", op: 0.85 }) +
        PL.olas(1250, { L: 220, amp: 22, h: 300, color: PL.TUR, cls: "s06-o2" }) +
        `<g class="s06-flechas"><path d="M80 1300 Q200 1270 320 1300 M420 1330 Q540 1300 660 1330 M760 1300 Q880 1270 1000 1300" fill="none" stroke="${PL.CRE}" stroke-width="10" stroke-linecap="round"/>
          <path d="M300 1284 L324 1300 L300 1318 M640 1314 L664 1330 L640 1348 M980 1284 L1004 1300 L980 1318" fill="none" stroke="${PL.CRE}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g>`;
      const K = PL.kit(tl, root);
      const { q, qa } = K;
      const HAY = 0.66, VISTO = 1.65, VISTO2 = 3.02, LLEVA = 3.27, CORR = 4.15;
      K.popSvg(q(".s06-cel"), 0, "490 960", 0.3, 0.85);
      gsap.set(q(".s06-m2"), { opacity: 0 }); gsap.set(q(".s06-m3"), { opacity: 0 });
      tl.fromTo(q(".s06-m2"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, 0.05);
      tl.fromTo(q(".s06-m3"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, HAY);
      K.olear(".s06-o1, .s06-o2", 0, DUR, 200, 1.1);
      // ¡visto!: las tildes se ponen azules, tildes gigantes, sello
      qa(".s06-cel .pl-tilde").forEach((t) => tl.to(t, { stroke: "#2b8be6", duration: 0.05 }, VISTO));
      K.popSvg(q(".s06-tildes"), VISTO, "610 1150", 0.3, 2);
      K.sello(q(".s06-visto"), VISTO + 0.05, 8);
      K.sacudon(q(".s06-escenario"), VISTO + 0.08, 1);
      tl.to(q(".s06-visto"), { scale: 1.12, duration: 0.12, yoyo: true, repeat: 1 }, VISTO2);
      // la corriente se lleva el celular
      tl.to(q(".s06-o1"), { y: -120, duration: 0.6, ease: "power2.out" }, LLEVA);
      tl.to(q(".s06-o2"), { y: -90, duration: 0.6, ease: "power2.out" }, LLEVA);
      tl.to(q(".s06-cel"), { x: 700, y: 60, rotation: 25, svgOrigin: "490 960", duration: 1.6, ease: "power2.in" }, LLEVA + 0.1);
      tl.to(q(".s06-visto"), { x: 300, opacity: 0, duration: 0.8, ease: "power2.in" }, LLEVA + 0.6);
      K.popSvg(q(".s06-flechas"), CORR - 0.3, "540 1310", 0.3, 0.6);
      tl.fromTo(q(".s06-flechas"), { x: -40 }, { x: 60, duration: 1.0, ease: "none", immediateRender: false }, CORR - 0.3);
      K.pop(q(".s06-corr"), CORR);
""", [{"t":0.05,"sfx":"notification","vol":0.25},{"t":0.66,"sfx":"notification","vol":0.25},{"t":1.6,"sfx":"golpe","vol":0.4},{"t":1.65,"sfx":"glitch-1","vol":0.25,"max":0.4},{"t":3.3,"sfx":"whoosh-cinematic","vol":0.3,"max":1.2},{"t":4.15,"sfx":"uuh","vol":0.2,"max":0.8}])

# ---------- s07 reposera
mk("s07-reposera", 3.69, """
.s07-tag { left: 90px; top: 1390px; }
.s07-man { position: absolute; left: 600px; top: 640px; width: 380px; height: 250px; background: #fff6e3; border: 6px solid #10202b; border-radius: 10px; box-shadow: 8px 8px 0 rgba(16,32,43,0.3); text-align: center; }
.s07-man small { display: block; margin-top: 0; padding: 8px 0; background: #e5484d; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 24px; letter-spacing: 0.24em; color: #fff6e3; }
.s07-man b { display: block; margin-top: 14px; font-family: "Caveat", cursive; font-weight: 700; font-size: 76px; line-height: 0.9; color: #10202b; }
""", """
        <div class="pl-tag rojo s07-tag">MODO REPOSERA</div>
        <div class="s07-man"><small>PENDIENTES</small><b>mañana le<br>contesto</b></div>
""", r"""
      svg.innerHTML =
        `<path d="M620 1380 L650 760" stroke="${PL.INK}" stroke-width="16" stroke-linecap="round" class="s07-palo"/>
         <path d="M380 800 Q650 600 920 720 Q840 750 790 780 Q720 740 650 760 Q580 750 510 790 Q450 790 380 800 Z" fill="${PL.ROJO}" stroke="${PL.INK}" stroke-width="9" stroke-linejoin="round" class="s07-somb"/>` +
        `<g class="s07-due">${PL.dueno(420, 1370, 1.25, { cara: "desganado", cel: true, zzz: true })}</g>`;
      const K = PL.kit(tl, root);
      const { q } = K;
      const REPO = 0.36, MANANA = 2.01, CONTESTO = 3.10;
      K.popSvg(q(".s07-due"), 0, "420 1370", 0.35, 0.85);
      tl.fromTo(q(".s07-escenario"), { scale: 1.04 }, { scale: 1, duration: DUR, ease: "power1.out", transformOrigin: "40% 70%" }, 0);
      K.hablar(".s07-due .pl-d-boca", 0.05, 4, 0.14);
      K.pop(q(".s07-tag"), REPO);
      // se acomoda: la cabeza se ladea, el celular boca abajo vibra
      const cab = q(".s07-due .pl-d-cabeza");
      tl.to(cab, { rotation: -6, svgOrigin: "0 -300", duration: 0.5, ease: "sine.inOut" }, REPO + 0.2);
      tl.fromTo(q(".s07-due .pl-d-cel"), { x: 0 }, { x: 5, duration: 0.04, yoyo: true, repeat: 11, ease: "none", immediateRender: false }, 1.0);
      K.sello(q(".s07-man"), MANANA, 4);
      tl.fromTo(q(".s07-due .pl-d-zzz"), { y: 10, opacity: 0 }, { y: -20, opacity: 1, duration: 0.6, ease: "sine.out", immediateRender: false }, CONTESTO);
""", [{"t":0.0,"sfx":"ronquido","vol":0.18,"max":1.0},{"t":0.36,"sfx":"pop","vol":0.25},{"t":1.0,"sfx":"vibra","vol":0.25,"max":0.5},{"t":2.0,"sfx":"golpe","vol":0.3}])
