from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-ej { top: 600px; font-size: 120px; }
    [data-composition-id="%ID%"] .s07-num { top: 700px; font-size: 400px; line-height: 1; }
    [data-composition-id="%ID%"] .s07-due { left: 340px; top: 700px; }
    [data-composition-id="%ID%"] .s07-arr { top: 590px; font-size: 130px; }
    [data-composition-id="%ID%"] .s07-sin { top: 600px; font-size: 92px; }
    [data-composition-id="%ID%"] .s07-rot { font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 30px; letter-spacing: 6px; }
    [data-composition-id="%ID%"] .s07-lex { font-family: "Lexend", sans-serif; font-weight: 800; }
"""
franjas = "".join(f'<rect class="s07-fr" x="-300" y="{y}" width="1700" height="{h}" fill="{c}" transform="rotate(-14 540 {y})"/>'
                  for y, h, c in [(760, 70, A), (850, 46, R), (920, 30, T)])
frascos = "".join(f'<g class="s07-fr{i}"><rect x="{x}" y="{y}" width="58" height="76" rx="10" fill="{c}" stroke="{D}" stroke-width="5"/><rect x="{x+6}" y="{y-14}" width="46" height="18" rx="4" fill="{D}"/></g>'
                  for i, (x, y, c) in enumerate([(120, 794, A), (200, 794, R), (280, 794, T), (120, 914, T), (200, 914, A), (300, 914, R)]))
body = f"""
        <svg class="s07-full" viewBox="0 0 1080 1920" aria-hidden="true">{franjas}
          <!-- el local: estante -->
          <g class="s07-local">
            <rect x="90" y="760" width="330" height="290" rx="8" fill="{V}" stroke="{C}" stroke-width="6"/>
            <path d="M90 875 H420 M90 995 H420" stroke="{C}" stroke-width="8"/>
            {frascos}
            <text class="s07-rot" x="255" y="1100" text-anchor="middle" fill="{C}">EL LOCAL</text>
          </g>
          <!-- la tienda online: compu con el producto -->
          <g class="s07-tienda">
            <rect x="620" y="740" width="380" height="290" rx="16" fill="{D}" stroke="{C}" stroke-width="6"/>
            <rect x="642" y="762" width="336" height="246" rx="6" fill="{C}"/>
            <rect x="582" y="1030" width="456" height="26" rx="10" fill="{C}" stroke="{D}" stroke-width="4"/>
            <rect x="660" y="780" width="110" height="120" rx="10" fill="{T}" stroke="{D}" stroke-width="4"/>
            <rect x="690" y="796" width="50" height="16" rx="4" fill="{D}"/>
            <text class="s07-lex" x="786" y="818" font-size="30" fill="{D}">Frasco</text>
            <text class="s07-lex" x="786" y="852" font-size="30" fill="{D}">artesanal</text>
            <text x="786" y="892" font-family="IBM Plex Mono" font-weight="600" font-size="28" fill="{V}">STOCK:</text>
            <text class="s07-lex s07-st1" x="886" y="896" font-size="46" fill="{R}">1</text>
            <text class="s07-lex s07-st0" x="886" y="896" font-size="46" fill="{R}" opacity="0">0</text>
            <rect class="s07-btn" x="662" y="925" width="296" height="62" rx="31" fill="{R}" stroke="{D}" stroke-width="4"/>
            <text class="s07-lex" x="810" y="967" text-anchor="middle" font-size="32" fill="{C}">COMPRAR</text>
            <g class="s07-sello" opacity="0" data-layout-allow-overlap><rect x="652" y="840" width="316" height="96" rx="10" fill="none" stroke="{R}" stroke-width="10" transform="rotate(-12 810 888)"/>
              <text class="s07-lex" x="810" y="906" text-anchor="middle" font-size="54" fill="{R}" transform="rotate(-12 810 888)">AGOTADO</text></g>
            <path class="s07-cursor" d="M900 1000 L900 1050 L912 1038 L922 1060 L930 1056 L920 1034 L936 1034 Z" fill="{C}" stroke="{D}" stroke-width="4" opacity="0"/>
            <text class="s07-rot" x="810" y="1100" text-anchor="middle" fill="{C}">TIENDA ONLINE</text>
          </g>
          <!-- flecha de un lado al otro -->
          <path class="s07-flecha" d="M440 840 Q520 780 600 840" stroke="{A}" stroke-width="10" fill="none" stroke-linecap="round"/>
          <path class="s07-punta" d="M584 816 L604 844 L572 852" stroke="{A}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="big c s07-ej">Ejercicio</div>
        <div class="big a s07-num">3</div>
        <div class="fig s07-due">{duenio('s07d')}</div>
        <div class="big t s07-arr s07-a0">¡Arriba!</div>
        <div class="big r s07-arr s07-a1">¡Abajo!</div>
        <div class="big t s07-arr s07-a2">¡Arriba!</div>
        <div class="big r s07-arr s07-a3">¡Abajo!</div>
"""
js = """
      const TRES = 0.6, VENDISTE = 1.54, LOCAL = 2.3, SACALO = 3.0, TIENDA = 3.76, ARR = [5.25, 5.72, 6.39, 6.82], QUE = 7.59, COMPRE = 8.2, TENES = 9.23;
      qa(".s07-fr").forEach((f, i) => tl.fromTo(f, { x: i % 2 ? 1400 : -1400 }, { x: 0, duration: 0.35, ease: "power3.out" }, i * 0.06));
      gsap.set(q(".s07-ej"), { opacity: 1, rotation: -6 });
      tl.fromTo(q(".s07-ej"), { x: -900 }, { x: 0, duration: 0.25, ease: "power4.out" }, 0);
      golpe(q(".s07-num"), TRES, -6, 3.4); sacudon(TRES, 2);
      tl.to([...qa(".s07-fr"), q(".s07-ej"), q(".s07-num")], { x: -2300, duration: 0.3, ease: "power3.in", stagger: 0.03 }, 1.25);
      // el local y la tienda
      gsap.set([q(".s07-local"), q(".s07-tienda"), q(".s07-due")], { opacity: 0 });
      tl.fromTo(q(".s07-local"), { opacity: 0, x: -400 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, 1.4);
      // "vendiste": un frasco se va
      tl.to(q(".s07-fr2"), { y: -80, x: 60, opacity: 0, duration: 0.35, ease: "power2.in" }, VENDISTE + 0.2);
      tl.to(q(".s07-local"), { rotation: -2, svgOrigin: "255 1050", duration: 0.08, yoyo: true, repeat: 3 }, LOCAL);
      tl.fromTo(q(".s07-tienda"), { opacity: 0, x: 400 }, { opacity: 1, x: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, SACALO - 0.2);
      gsap.set(q(".s07-due"), { scale: 0.62, transformOrigin: "50% 98%" });
      tl.fromTo(q(".s07-due"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, SACALO);
      // flecha del local a la tienda
      tl.fromTo(q(".s07-flecha"), { opacity: 0, strokeDasharray: 200, strokeDashoffset: 200 }, { opacity: 1, strokeDashoffset: 0, duration: 0.4, ease: "power2.inOut" }, SACALO);
      tl.fromTo(q(".s07-punta"), { opacity: 0 }, { opacity: 1, duration: 0.1 }, SACALO + 0.35);
      // a mano: cursor y el stock que baja a 0
      tl.to(q(".s07-cursor"), { opacity: 1, duration: 0.1 }, TIENDA);
      tl.fromTo(q(".s07-cursor"), { x: 0, y: 0 }, { x: 66, y: -70, duration: 0.35, ease: "power2.inOut", immediateRender: false }, TIENDA);
      tl.set(q(".s07-st1"), { opacity: 0 }, TIENDA + 0.45);
      tl.to(q(".s07-cursor"), { opacity: 0, duration: 0.15 }, TIENDA + 0.7);
      tl.to(q(".s07-cursor"), { opacity: 1, duration: 0.15 }, QUE); tl.set(q(".s07-st0"), { opacity: 1 }, TIENDA + 0.45);
      tl.fromTo(q(".s07-st0"), { scale: 2 }, { scale: 1, transformOrigin: "50% 50%", duration: 0.2, immediateRender: false }, TIENDA + 0.45);
      // arriba, abajo: sentadillas con los brazos
      ARR.forEach((t, i) => {
        const arriba = i % 2 === 0;
        tl.to(q(".s07d-bi"), { rotation: arriba ? 160 : 0, svgOrigin: "150 286", duration: 0.18, ease: "power2.out" }, t - 0.05);
        tl.to(q(".s07d-bd"), { rotation: arriba ? -160 : 0, svgOrigin: "250 286", duration: 0.18, ease: "power2.out" }, t - 0.05);
        tl.to(q(".s07-due"), { y: arriba ? -40 : 40, duration: 0.18, ease: "power2.out" }, t - 0.05);
        golpe(q(".s07-a" + i), t, arriba ? -5 : 5, 2.4);
        if (i < 3) tl.set(q(".s07-a" + i), { opacity: 0 }, ARR[i + 1] - 0.1);
        tl.to(q(".s07-flecha"), { scaleY: arriba ? -1 : 1, svgOrigin: "520 820", duration: 0.15 }, t);
      });
      tl.to(q(".s07-a3"), { opacity: 0, duration: 0.15 }, QUE - 0.1);
      tl.to(q(".s07-due"), { y: 0, duration: 0.2 }, QUE);
      tl.to(q(".s07d-gotas"), { y: 18, duration: 0.3, yoyo: true, repeat: 21 }, SACALO);
      // "que nadie te compre": el cursor apunta a COMPRAR... y sale el sello
      tl.to(q(".s07-cursor"), { x: -60, y: -60, duration: 0.3, ease: "power2.inOut" }, QUE);
      tl.to(q(".s07-btn"), { scale: 1.08, transformOrigin: "50% 50%", duration: 0.12, yoyo: true, repeat: 5 }, COMPRE);
      tl.set(q(".s07-sello"), { opacity: 1 }, TENES - 0.05);
      tl.fromTo(q(".s07-sello"), { scale: 2.4, svgOrigin: "810 888" }, { scale: 1, svgOrigin: "810 888", duration: 0.14, ease: "power4.in", immediateRender: false }, TENES - 0.05);
      sacudon(TENES + 0.08, 1.5);
"""
sfx = [{"t": 0.02, "sfx": "whoosh-cinematic", "vol": 0.3, "max": 0.8}, {"t": 0.57, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6},
       {"t": 1.75, "sfx": "pop", "vol": 0.3}, {"t": 4.2, "sfx": "key-press", "vol": 0.4}, {"t": 5.2, "sfx": "whoosh-short", "vol": 0.25},
       {"t": 6.35, "sfx": "whoosh-short", "vol": 0.25}, {"t": 8.2, "sfx": "click", "vol": 0.35}, {"t": 9.18, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.6}]
escena("s07-stock", p, 10.25, css, body, js, sfx)
