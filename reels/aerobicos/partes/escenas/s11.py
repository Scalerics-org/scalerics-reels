from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-ins { left: 140px; top: 610px; }
    [data-composition-id="%ID%"] .s11-ins2 { left: 140px; top: 610px; opacity: 0.4; filter: none; mix-blend-mode: screen; }
    [data-composition-id="%ID%"] .s11-otro { top: 590px; font-size: 150px; }
    [data-composition-id="%ID%"] .s11-q { position: absolute; left: 820px; top: 830px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 190px; color: #ff2e88; -webkit-text-stroke: 10px #160a2a; paint-order: stroke fill; }
"""
body = f"""
        <svg class="s11-full" viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s11-cas">
            <rect x="600" y="980" width="340" height="200" rx="14" fill="{D}" stroke="{C}" stroke-width="6"/>
            <rect x="624" y="998" width="292" height="96" rx="8" fill="{C}"/>
            <rect x="624" y="998" width="292" height="24" fill="{R}"/>
            <text x="770" y="1068" text-anchor="middle" font-family="Lexend" font-weight="900" font-style="italic" font-size="36" fill="{D}">AERÓBICOS</text>
            <rect x="680" y="1110" width="180" height="50" rx="25" fill="{V}" stroke="{C}" stroke-width="4"/>
            <circle cx="712" cy="1135" r="16" fill="{C}"/><circle cx="828" cy="1135" r="16" fill="{C}"/>
          </g>
        </svg>
        <div class="fig s11-ins2">{instructora('s11j')}</div>
        <div class="fig s11-ins">{instructora('s11i')}</div>
        <div class="big t s11-otro">¿Otro?</div>
        <div class="s11-q">?</div>
"""
js = """
      const ESO = 0.99, CAS = 1.73;
      gsap.set([q(".s11-ins"), q(".s11-ins2")], { scale: 0.86, transformOrigin: "50% 98%" });
      // congelada en pausa, con un brazo arriba, la sonrisa clavada
      for (const k of ["s11i", "s11j"]) { gsap.set(q("." + k + "-bi"), { rotation: 150, svgOrigin: "158 272" }); gsap.set(q("." + k + "-bd"), { rotation: -40, svgOrigin: "242 272" }); }
      // temblor de pausa del VHS: el fantasma turquesa corrido
      tl.fromTo(q(".s11-ins2"), { x: 14 }, { x: -10, duration: 0.07, yoyo: true, repeat: 39, ease: "none" }, 0);
      tl.fromTo(q(".s11-ins"), { y: 0 }, { y: -4, duration: 0.05, yoyo: true, repeat: 55, ease: "none" }, 0);
      golpe(q(".s11-otro"), 0.08, -4, 2.6);
      tl.to(q(".s11-otro"), { skewX: -14, x: 20, duration: 0.06, yoyo: true, repeat: 11, ease: "none" }, 0.3);
      // "eso no está...": se le borra la sonrisa
      tl.set(qa(".s11i-boca-ok, .s11j-boca-ok"), { opacity: 0 }, ESO);
      tl.set(qa(".s11i-boca-o, .s11j-boca-o"), { opacity: 1 }, ESO);
      tl.to(q(".s11i-ojos"), { scaleY: 0.3, transformOrigin: "50% 50%", duration: 0.06, yoyo: true, repeat: 3 }, ESO + 0.2);
      // el cassette y el signo de pregunta
      gsap.set(q(".s11-cas"), { opacity: 0 });
      tl.fromTo(q(".s11-cas"), { opacity: 0, y: 200, rotation: 10, svgOrigin: "770 1080" }, { opacity: 1, y: 0, rotation: -4, svgOrigin: "770 1080", duration: 0.3, ease: "back.out(1.8)", immediateRender: false }, ESO + 0.2);
      golpe(q(".s11-q"), CAS, 10, 3);
      tl.to(q(".s11-q"), { rotation: -6, duration: 0.12, yoyo: true, repeat: 5 }, CAS + 0.1);
"""
sfx = [{"t": 0.0, "sfx": "glitch-1", "vol": 0.35, "max": 0.5}, {"t": 0.05, "sfx": "click", "vol": 0.4}, {"t": 1.2, "sfx": "pop", "vol": 0.3}, {"t": 1.7, "sfx": "glitch-2", "vol": 0.25, "max": 0.4}]
escena("s11-pausa", p, 2.86, css, body, js, sfx)
