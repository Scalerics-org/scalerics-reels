ID = "s09-origen"; DUR = 5.52
DENTRO = """
            <rect x="60" y="560" width="960" height="940" fill="url(#s09-htn)" />
            <g class="s09-ventana"><rect x="560" y="640" width="380" height="330" fill="#0b1430" stroke="#111111" stroke-width="8" /><path d="M750 640 V970 M560 805 H940" stroke="#111111" stroke-width="8" />
              <circle cx="660" cy="720" r="40" fill="#fdf6e3" stroke="#111111" stroke-width="5" />
              <g class="s09-senal"><path d="M940 970 L800 700 L900 660 Z" fill="#ffd23f" opacity="0.35" /><g transform="translate(850 690)"><ellipse cx="0" cy="0" rx="62" ry="44" fill="#ffd23f" stroke="#111111" stroke-width="6" /><path d="M-26 -8 H26 M-26 10 H12" stroke="#111111" stroke-width="7" stroke-linecap="round" /><path d="M-22 38 L-36 64 L4 42" fill="#ffd23f" stroke="#111111" stroke-width="6" stroke-linejoin="round" /></g></g>
            </g>
            <rect class="nn" x="60" y="1280" width="960" height="240" />
            <path class="l" d="M60 1280 H1020" stroke-width="10" />
            <g class="s09-cel"><g transform="translate(420 960)">
              """ + RAYOS("s09", "s09-luz", 120, 170, 32, 170, 520, "#ffd23f", 10, 0.8) + """
              <rect class="a" x="0" y="0" width="240" height="330" rx="36" /><rect class="s09-pant" x="18" y="40" width="204" height="250" rx="14" fill="#14214a" stroke="#111111" stroke-width="6" />
              <g class="s09-cara"><ellipse cx="88" cy="140" rx="16" ry="20" fill="#111111" /><ellipse cx="152" cy="140" rx="16" ry="20" fill="#111111" /><path d="M84 200 C104 226 136 226 156 200" fill="none" stroke="#111111" stroke-width="8" stroke-linecap="round" /></g>
            </g></g>
            <path class="s09-rayo" d="M300 600 L240 780 L300 780 L220 980 L380 740 L310 740 L370 600 Z" fill="#ffd23f" stroke="#111111" stroke-width="7" stroke-linejoin="round" />
"""
CSS = ""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">""" + DEFS("s09") + VINETA("s09", "s09-v", 60, 560, 960, 940, "#14214a", DENTRO) + """</svg>
        """ + ONO("s09-origen", "EL ORIGEN", 70, 600, 150, "#ffd23f", -5, 940) + """
        """ + CAJA("s09-noche", "ESA NOCHE, EN LA CONFITERÍA...", 90, 1330, 40, "#fdf6e3", "#111111", -2) + """
        """ + ONO("s09-fzz", "¡FZZZT!", 640, 1110, 120, "#ffd23f", 8) + """
"""
JS = """
      const ORIGEN = 1.58, Y = 2.45, CEL = 3.42, PRENDIO = 4.17;
      camara(".s09-v", 0, DUR, 1.0, 1.08, "540px 1120px");
      gsap.set(q(".s09-cara"), { opacity: 0 }); gsap.set(q(".s09-luz"), { opacity: 0 }); gsap.set(q(".s09-senal"), { opacity: 0 });
      entra(".s09-cel", 0, { y: 200 }, 0.35);
      golpe(".s09-origen", ORIGEN, 2.4);
      sacudon(ORIGEN + 0.05, 1.0);
      tl.to(q(".s09-origen"), { y: -20, opacity: 0, duration: 0.25 }, Y - 0.1);
      pop(".s09-noche", Y, { rotation: -6 });
      // el rayo
      gsap.set(q(".s09-rayo"), { opacity: 0 });
      tl.to(q(".s09-rayo"), { opacity: 1, duration: 0.02 }, CEL - 0.1);
      tl.to(q(".s09-rayo"), { opacity: 0, duration: 0.02 }, CEL + 0.05);
      tl.to(q(".s09-rayo"), { opacity: 1, duration: 0.02 }, CEL + 0.12);
      tl.to(q(".s09-rayo"), { opacity: 0, duration: 0.15 }, CEL + 0.35);
      sacudon(CEL - 0.08, 0.9);
      // se prende solo
      tl.to(q(".s09-pant"), { fill: "#fdf6e3", duration: 0.06 }, PRENDIO);
      tl.to(q(".s09-cara"), { opacity: 1, duration: 0.06 }, PRENDIO);
      tl.fromTo(q(".s09-luz"), { opacity: 0, scale: 0.4, svgOrigin: "120 170" }, { opacity: 0.8, scale: 1, svgOrigin: "120 170", duration: 0.3, ease: "back.out(2)", immediateRender: false }, PRENDIO);
      tl.to(q(".s09-luz"), { rotation: 20, svgOrigin: "120 170", duration: 1.2, ease: "none" }, PRENDIO + 0.3);
      golpe(".s09-fzz", PRENDIO + 0.1, 2.0);
      tl.fromTo(q(".s09-senal"), { opacity: 0 }, { opacity: 1, duration: 0.15, immediateRender: false }, PRENDIO + 0.3);
      tl.fromTo(q(".s09-cel"), { y: 0 }, { y: -30, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, PRENDIO);
"""
SFX = [{"t": 0.05, "sfx": "riser", "vol": 0.2, "max": 1.6}, {"t": 1.55, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 3.3, "sfx": "glitch-2", "vol": 0.3, "max": 0.5}, {"t": 3.32, "sfx": "impact-bass-1", "vol": 0.4, "max": 0.8}, {"t": 4.17, "sfx": "sparkle", "vol": 0.35}, {"t": 4.2, "sfx": "glitch-1", "vol": 0.25, "max": 0.4}]
