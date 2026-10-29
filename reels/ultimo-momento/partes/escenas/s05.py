ID = "s05-peso"; DUR = 3.84
CSS = """
    $ .s05-peso { left: 600px; top: 640px; background: #f4f6fb; color: #0b1d4a; font-size: 50px; box-shadow: 8px 8px 0 #e3212d; transform: rotate(4deg); }
    $ .s05-archivo { position: absolute; left: 60px; top: 580px; width: 960px; height: 620px; border: 7px solid #f4f6fb; border-radius: 14px; overflow: hidden; background: #1f4fa8; }
    $ .s05-arch-tag { position: absolute; left: 24px; top: 20px; padding: 6px 14px 4px; background: #ffd21f; color: #050d22; font-size: 30px; letter-spacing: 0.16em; }
    $ .s05-llenaba { top: 1250px; font-size: 92px; color: #f4f6fb; text-shadow: 8px 8px 0 #e3212d; }
"""
GENTE = "".join(f'<g class="s05-p"><circle cx="{x}" cy="{y}" r="34" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="6"/><path d="M{x-56} {y+150} C{x-56} {y+70} {x+56} {y+70} {x+56} {y+150} Z" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="6"/></g>' for x, y in [(540, 470), (450, 490), (360, 480), (270, 500), (180, 486), (90, 500)])
HTML = """
        <g></g>
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s05-bolsa">
            <path class="b" d="M330 1000 C330 900 750 900 750 1000 L770 1240 C770 1290 310 1290 310 1240 Z" />
            <path class="l s05-tapa" d="M330 1000 C420 960 660 960 750 1000" stroke-width="10" />
            <path class="l" d="M500 940 C500 880 580 880 580 940" />
            <circle cx="540" cy="1110" r="40" fill="none" stroke="#f4f6fb" stroke-width="6" opacity="0.5" />
          </g>
          <g class="s05-moneda"><circle cx="540" cy="980" r="22" fill="#ffd21f" stroke="#f4f6fb" stroke-width="5" /><text x="540" y="990" text-anchor="middle" font-family="Lexend" font-weight="900" font-size="26" fill="#050d22" data-layout-ignore>1</text></g>
          <g class="s05-polilla"><path d="M540 960 C510 930 490 950 520 970 C490 990 510 1010 540 980 C570 1010 590 990 560 970 C590 950 570 930 540 960 Z" fill="#f4f6fb" /></g>
        </svg>
        <div class="cartela s05-peso">UN PESO</div>
        <div class="s05-archivo">
          <svg viewBox="0 150 960 620" style="width:960px;height:620px" aria-hidden="true">
            <rect x="560" y="250" width="360" height="510" fill="#0b1d4a" stroke="#f4f6fb" stroke-width="7" />
            <path d="M540 250 L580 190 H900 L940 250 Z" fill="#e3212d" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
            <rect x="640" y="380" width="200" height="380" fill="#1f4fa8" stroke="#f4f6fb" stroke-width="7" />
            <path d="M0 690 H960" stroke="#f4f6fb" stroke-width="5" opacity="0.5" />
            """ + GENTE + """
          </svg>
          <div class="s05-arch-tag mono">ARCHIVO · 1998</div>
        </div>
        <div class="txt s05-llenaba">SE LLENABA</div>
"""
JS = """
      const PESO = 0.83, ANTES = 1.86, LLENABA = 2.64;
      // cuadro 0: el monedero ya está, se sacude y se abre
      tl.fromTo(q(".s05-bolsa"), { y: 60, opacity: 0.7 }, { y: 0, opacity: 1, duration: 0.25, ease: "back.out(2)" }, 0);
      tl.to(q(".s05-tapa"), { y: -50, duration: 0.2, ease: "back.out(2)" }, 0.16);
      gsap.set([q(".s05-moneda"), q(".s05-polilla")], { opacity: 0 });
      tl.fromTo(q(".s05-polilla"), { opacity: 1, x: 0, y: 0 }, { opacity: 1, x: 260, y: -300, duration: 0.9, ease: "sine.inOut", immediateRender: false }, 0.25);
      tl.to(q(".s05-polilla"), { scaleY: 0.4, svgOrigin: "540 970", duration: 0.08, yoyo: true, repeat: 9 }, 0.25);
      // una moneda sola rueda
      tl.fromTo(q(".s05-moneda"), { opacity: 1, y: -60 }, { opacity: 1, y: 330, duration: 0.35, ease: "bounce.out", immediateRender: false }, PESO - 0.25);
      tl.to(q(".s05-moneda"), { x: -260, rotation: -360, svgOrigin: "540 980", duration: 0.8, ease: "power2.out" }, PESO + 0.1);
      pop(".s05-peso", PESO);
      // ANTES: archivo con fila de gente
      gsap.set(q(".s05-archivo"), { opacity: 0 });
      tl.to([q(".s05-bolsa"), q(".s05-moneda"), q(".s05-peso")], { opacity: 0, duration: 0.1 }, ANTES - 0.1);
      tl.fromTo(q(".s05-archivo"), { opacity: 1, scale: 1.1, filter: "blur(4px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power3.out", immediateRender: false }, ANTES - 0.05);
      tl.fromTo(qa(".s05-p"), { y: 20 }, { y: 0, duration: 0.15, stagger: 0.03, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, ANTES);
      golpe(".s05-llenaba", LLENABA, 2.2);
      // la fila se desvanece de a uno
      tl.to(qa(".s05-p").reverse(), { opacity: 0, y: 20, duration: 0.15, stagger: 0.12 }, LLENABA + 0.3);
"""
SFX = [{"t": 0.16, "sfx": "click", "vol": 0.25}, {"t": 0.6, "sfx": "ping", "vol": 0.22}, {"t": 1.8, "sfx": "glitch-1", "vol": 0.2, "max": 0.4}, {"t": 2.58, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
