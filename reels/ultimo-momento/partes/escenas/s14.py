ID = "s14-cta"; DUR = 9.02
CSS = """
    $ .s14-fase { position: absolute; inset: 0; }
    $ .s14-tv { position: absolute; left: 60px; top: 600px; width: 960px; height: 700px; background: #f4f6fb; transform-origin: 50% 50%; }
    $ .s14-logo { position: absolute; left: 290px; top: 600px; width: 500px; height: auto; }
    $ .s14-tuyo { left: 0; right: 0; margin: 0 auto; width: 420px; text-align: center; top: 1300px; background: #5ce611; color: #050d22; font-size: 64px; box-shadow: 8px 8px 0 #050d22; }
    $ .s14-manda { top: 620px; font-size: 130px; color: #f4f6fb; text-shadow: 10px 10px 0 #5ce611; }
    $ .s14-al { position: absolute; left: 0; right: 0; top: 840px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 54px; line-height: 1.2; color: #f4f6fb; }
    $ .s14-dolar-w { position: absolute; left: 0; right: 0; top: 990px; text-align: center; }
    $ .s14-dolar { display: inline-block; position: relative; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 170px; line-height: 1; color: #ff5a5f; text-shadow: 10px 10px 0 #050d22; }
    $ .s14-tacha { position: absolute; left: -20px; right: -20px; top: 50%; height: 22px; margin-top: -11px; background: #5ce611; border-radius: 11px; transform-origin: 0% 50%; }
    $ .s14-hint { position: absolute; left: 0; right: 0; top: 1250px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 30px; letter-spacing: 0.22em; color: #5ce611; }
"""
import random
random.seed(7)
PUNTOS = [(x, y) for x in range(150, 1000, 120) for y in range(680, 1240, 115)]
DOTS = "".join(f'<circle class="s14-dot" cx="{x + random.randint(-30, 30)}" cy="{y + random.randint(-25, 25)}" r="16" fill="#e3212d" stroke="#f4f6fb" stroke-width="4" />' for x, y in PUNTOS)
HTML = """
        <div class="s14-fase s14-a">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s14-mapa" opacity="0.55">
              <path class="s14-calle" d="M60 700 C300 690 700 720 1020 690 M60 900 C400 920 700 880 1020 910 M60 1120 C350 1100 650 1140 1020 1110 M220 600 C200 800 240 1000 210 1300 M520 600 C540 800 500 1000 530 1300 M820 600 C800 800 840 1000 810 1300" fill="none" stroke="#1f4fa8" stroke-width="18" stroke-linecap="round" />
            </g>
            """ + DOTS + """
          </svg>
        </div>
        <div class="s14-fase s14-b">
          <img class="s14-logo" src="assets/logo-blanco.png" alt="Scalerics" />
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s14-agente">
              <path class="gl" d="M410 920 C410 790 670 790 670 920" stroke-width="14" />
              <rect class="g" x="384" y="900" width="56" height="110" rx="22" />
              <rect class="g" x="640" y="900" width="56" height="110" rx="22" />
              <rect x="440" y="800" width="200" height="360" rx="36" fill="#0b1d4a" stroke="#5ce611" stroke-width="8" />
              <g class="s14-ojos"><path class="gl" d="M488 940 h34 M558 940 h34" stroke-width="12" /></g>
              <path class="gl" d="M500 1010 C525 1036 555 1036 580 1010" stroke-width="9" />
            </g>
          </svg>
          <div class="cartela s14-tuyo">EL TUYO</div>
        </div>
        <div class="s14-fase s14-c">
          <svg viewBox="0 0 1080 1920" aria-hidden="true">
            <g class="s14-avion">
              <path d="M760 1180 L1000 1080 L900 1290 L860 1210 Z" fill="#5ce611" stroke="#f4f6fb" stroke-width="6" stroke-linejoin="round" />
              <path d="M860 1210 L1000 1080" stroke="#050d22" stroke-width="6" />
              <path class="s14-estela" d="M740 1190 C640 1230 560 1180 480 1230" fill="none" stroke="#5ce611" stroke-width="6" stroke-dasharray="14 16" stroke-linecap="round" />
            </g>
          </svg>
          <div class="txt s14-manda">Mandáselo</div>
          <div class="s14-al">al que le echa la culpa al</div>
          <div class="s14-dolar-w"><span class="s14-dolar">DÓLAR<i class="s14-tacha"></i></span></div>
        </div>
        <div class="s14-tv"></div>
"""
JS = """
      const PASA = 0.3, BARRIOS = 1.2, SCALERICS = 1.92, ARMAMOS = 2.55, TUYO = 3.3, MANDA = 3.9, CULPA = 4.99, DOLAR = 5.4;
      // cuadro 0: la tele se apaga en una línea
      tl.fromTo(q(".s14-tv"), { scaleY: 0.5, scaleX: 1, opacity: 1 }, { scaleY: 0.006, duration: 0.14, ease: "power3.in" }, 0);
      tl.to(q(".s14-tv"), { scaleX: 0, duration: 0.14, ease: "power3.in" }, 0.14);
      tl.to(q(".s14-tv"), { opacity: 0, duration: 0.02 }, 0.28);
      // todos los barrios: se prenden locales en rojo
      const dots = qa(".s14-dot");
      gsap.set(dots, { opacity: 0 });
      tl.fromTo(q(".s14-mapa"), { opacity: 0 }, { opacity: 0.55, duration: 0.3, immediateRender: false }, 0.2);
      dots.forEach((d, i) => tl.fromTo(d, { opacity: 0, scale: 0.2, svgOrigin: d.getAttribute("cx") + " " + d.getAttribute("cy") }, { opacity: 1, scale: 1, svgOrigin: d.getAttribute("cx") + " " + d.getAttribute("cy"), duration: 0.2, ease: "back.out(3)", immediateRender: false }, PASA + ((i * 7) % dots.length) * (1.3 / dots.length)));
      // Scalerics: el mapa se apaga y entra el logo + el agente
      gsap.set(q(".s14-b"), { opacity: 0 });
      tl.to(q(".s14-a"), { opacity: 0.18, duration: 0.25 }, SCALERICS - 0.2);
      tl.to(q(".s14-b"), { opacity: 1, duration: 0.01 }, SCALERICS - 0.15);
      tl.fromTo(q(".s14-logo"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", immediateRender: false }, SCALERICS - 0.15);
      tl.fromTo(q(".s14-agente"), { opacity: 0, scale: 0.6, svgOrigin: "540 980" }, { opacity: 1, scale: 1, svgOrigin: "540 980", duration: 0.35, ease: "back.out(2)", immediateRender: false }, SCALERICS + 0.1);
      // armamos: los locales se vuelven verdes
      dots.forEach((d, i) => tl.to(d, { fill: "#5ce611", duration: 0.15 }, ARMAMOS + ((i * 7) % dots.length) * (0.7 / dots.length)));
      tl.to(q(".s14-a"), { opacity: 0.4, duration: 0.3 }, ARMAMOS);
      tl.fromTo(q(".s14-ojos"), { scaleY: 1, svgOrigin: "540 940" }, { scaleY: 0.15, svgOrigin: "540 940", duration: 0.06, yoyo: true, repeat: 1, immediateRender: false }, ARMAMOS + 0.2);
      golpe(".s14-tuyo", TUYO - 0.05, 2.2);
      sacudon(TUYO + 0.05);
      // Mandáselo
      gsap.set(q(".s14-c"), { opacity: 0 });
      tl.to([q(".s14-a"), q(".s14-b")], { opacity: 0, filter: "blur(6px)", duration: 0.14 }, MANDA - 0.12);
      tl.to(q(".s14-c"), { opacity: 1, duration: 0.01 }, MANDA - 0.1);
      golpe(".s14-manda", MANDA, 2.4);
      sacudon(MANDA + 0.05, 1.2);
      gsap.set(q(".s14-al"), { opacity: 0 });
      tl.fromTo(q(".s14-al"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.25, immediateRender: false }, 4.4);
      golpe(".s14-dolar-w", CULPA + 0.1, 2.2);
      gsap.set(q(".s14-tacha"), { scaleX: 0 });
      tl.to(q(".s14-tacha"), { scaleX: 1, duration: 0.3, ease: "power3.out" }, DOLAR + 0.25);
      // el avión de papel vuela
      gsap.set(q(".s14-avion"), { opacity: 0 });
      tl.fromTo(q(".s14-avion"), { opacity: 1, x: -700, y: 200 }, { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out", immediateRender: false }, MANDA + 0.3);
      tl.to(q(".s14-avion"), { y: -18, rotation: -4, svgOrigin: "880 1180", duration: 0.6, yoyo: true, repeat: 7, ease: "sine.inOut" }, MANDA + 0.9);
      // respira hasta el final
      tl.to(q(".s14-manda"), { scale: 1.04, duration: 0.6, yoyo: true, repeat: 3, ease: "sine.inOut" }, 6.0);
"""
SFX = [{"t": 0.0, "sfx": "glitch-1", "vol": 0.3, "max": 0.4}, {"t": 0.3, "sfx": "typing", "vol": 0.15, "max": 1.0}, {"t": 1.85, "sfx": "sparkle", "vol": 0.28}, {"t": 2.55, "sfx": "chime", "vol": 0.22}, {"t": 3.25, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 3.85, "sfx": "whoosh", "vol": 0.25}, {"t": 5.0, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 5.65, "sfx": "pop", "vol": 0.25}]
