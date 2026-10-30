from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-due { left: 340px; top: 600px; }
    [data-composition-id="%ID%"] .s09-camp { top: 590px; font-size: 140px; }
    [data-composition-id="%ID%"] .s09-man { top: 590px; font-size: 110px; }
    [data-composition-id="%ID%"] .s09-misma { top: 712px; font-size: 92px; }
"""
rayos = "".join(f'<path d="M540 1000 L{540 + 900 * __import__("math").cos(a / 180 * 3.14159 - 0.09):.0f} {1000 + 900 * __import__("math").sin(a / 180 * 3.14159 - 0.09):.0f} L{540 + 900 * __import__("math").cos(a / 180 * 3.14159 + 0.09):.0f} {1000 + 900 * __import__("math").sin(a / 180 * 3.14159 + 0.09):.0f} Z" fill="{R if (a // 30) % 2 else A}" opacity="0.32"/>' for a in range(0, 360, 30))
body = f"""
        <svg class="s09-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s09-zona"><rect x="0" y="560" width="1080" height="785"/></clipPath></defs>
          <g clip-path="url(#s09-zona)"><g class="s09-rayos">{rayos}</g></g>
          <g class="s09-step"><path d="M330 1300 L750 1300 L720 1250 L360 1250 Z" fill="{T}" stroke="{D}" stroke-width="6" stroke-linejoin="round"/>
            <rect x="330" y="1300" width="420" height="56" rx="8" fill="{R}" stroke="{D}" stroke-width="6"/></g>
          <g class="s09-rew" opacity="0"><path d="M110 1000 L230 920 L230 1080 Z M230 1000 L350 920 L350 1080 Z" fill="{C}"/></g>
        </svg>
        <div class="fig s09-due">{duenio('s09d')}</div>
        <div class="big a s09-camp">¡Campeón!</div>
        <div class="big t s09-man">Mañana,</div>
        <div class="big r s09-misma">la misma clase</div>
"""
js = """
      const CAMP = 0.71, MAN = 1.39, MISMA = 2.12, CLASE = 2.46;
      gsap.set(q(".s09-due"), { scale: 0.8, transformOrigin: "50% 98%", y: -50 });
      // pose de campeón: los dos brazos arriba
      gsap.set(q(".s09d-bi"), { rotation: 150, svgOrigin: "150 286" });
      gsap.set(q(".s09d-bd"), { rotation: -150, svgOrigin: "250 286" });
      tl.to(q(".s09d-bi"), { rotation: 165, svgOrigin: "150 286", duration: BEAT / 2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.to(q(".s09d-bd"), { rotation: -165, svgOrigin: "250 286", duration: BEAT / 2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s09-due"), { y: -50 }, { y: -80, duration: BEAT / 2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      tl.fromTo(q(".s09-rayos"), { rotation: 0, svgOrigin: "540 1000" }, { rotation: 30, svgOrigin: "540 1000", duration: MAN, ease: "none" }, 0);
      golpe(q(".s09-camp"), CAMP, -5, 3); sacudon(CAMP, 1.6);
      fuera(q(".s09-camp"), MAN - 0.15);
      // "mañana": REW. Los rayos giran para atrás, el dueño retrocede a los saltos y se desinfla
      tl.to(q(".s09-rayos"), { rotation: -330, svgOrigin: "540 1000", duration: DUR - MAN, ease: "power1.in" }, MAN);
      tl.set(q(".s09-rew"), { opacity: 1 }, MAN);
      tl.to(q(".s09-rew"), { opacity: 0.2, duration: 0.12, yoyo: true, repeat: 7 }, MAN + 0.1);
      [0, 1, 2, 3, 4, 5].forEach((k) => tl.to(q(".s09-due"), { x: k % 2 ? 20 : -20, duration: 0.06 }, MAN + k * 0.12));
      tl.to(q(".s09-due"), { x: 0, duration: 0.06 }, MAN + 0.75);
      tl.to(q(".s09d-bi"), { rotation: 10, svgOrigin: "150 286", duration: 0.35, ease: "power2.in" }, MISMA);
      tl.to(q(".s09d-bd"), { rotation: -10, svgOrigin: "250 286", duration: 0.35, ease: "power2.in" }, MISMA);
      tl.to(q(".s09-due"), { y: -30, duration: 0.3 }, MISMA);
      tl.set(q(".s09d-ojos"), { opacity: 0 }, CLASE); tl.set(q(".s09d-ojos-x"), { opacity: 1 }, CLASE);
      golpe(q(".s09-man"), MAN, 4, 2.6);
      golpe(q(".s09-misma"), MISMA, -4, 3); sacudon(MISMA, 1.2);
"""
sfx = [{"t": 0.0, "sfx": "sparkle", "vol": 0.3}, {"t": 0.68, "sfx": "impact-bass-1", "vol": 0.45, "max": 0.6},
       {"t": 1.35, "sfx": "glitch-1", "vol": 0.3, "max": 0.6}, {"t": 2.1, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.5}]
escena("s09-rocky", p, 3.80, css, body, js, sfx)
