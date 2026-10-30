ID = "s11-solo"; DUR = 5.88
CSS = """
    $ .s11-lento { left: 120px; top: 600px; background: #5ec8ff; color: #061428; font-size: 80px; box-shadow: 10px 10px 0 #061428; transform: rotate(-5deg); }
    $ .s11-solo { position: absolute; left: 0; right: 0; top: 545px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 1; color: #f4f6fb; text-shadow: 10px 10px 0 #061428; letter-spacing: 0.06em; }
"""
CARACOL = '<g transform="translate(830 700)"><path d="M-80 40 H80 C100 40 110 20 100 0" fill="none" stroke="#f4f6fb" stroke-width="7" stroke-linecap="round" /><circle cx="0" cy="-6" r="46" fill="#0b2547" stroke="#f4f6fb" stroke-width="7" /><path d="M0 -6 m0 0 c10 0 14 12 4 18 c-16 8 -30 -8 -24 -22 c8 -20 38 -20 46 2" fill="none" stroke="#5ec8ff" stroke-width="6" stroke-linecap="round" /><path d="M-60 40 C-70 20 -80 0 -90 -20 M-80 40 C-96 26 -110 10 -118 -10" fill="none" stroke="#f4f6fb" stroke-width="6" stroke-linecap="round" /><circle cx="-90" cy="-24" r="7" fill="#f4f6fb" /><circle cx="-118" cy="-14" r="7" fill="#f4f6fb" /></g>'
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs>
            <clipPath id="s11-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath>
            <clipPath id="s11-clipn"><rect x="330" y="860" width="420" height="480" /></clipPath>
          </defs>
          <g class="s11-a">
            <g class="s11-walter"><g transform="translate(330 760) scale(1.15)">""" + WALTER("s11") + """</g></g>
            <rect class="m" x="80" y="1170" width="920" height="180" rx="10" />
            <g class="s11-caracol">""" + CARACOL + """</g>
            <g clip-path="url(#s11-clip)">""" + lluvia("s11-lluvia", 45, -300, 1300, 420, 1000, 121, globos=0.5, vel=(900, 1200), esc=(1.0, 1.5), ang=14) + """</g>
          </g>
          <g class="s11-b">
            <path d="M0 1330 H1080" stroke="#f4f6fb" stroke-width="6" opacity="0.6" />
            <path d="M0 1350 H1080" stroke="#5ec8ff" stroke-width="10" stroke-dasharray="80 60" opacity="0.6" />
            <g opacity="0.45"><rect x="40" y="980" width="200" height="350" fill="#14457a" stroke="#f4f6fb" stroke-width="5" /><rect x="840" y="940" width="200" height="390" fill="#14457a" stroke="#f4f6fb" stroke-width="5" /></g>
            <g clip-path="url(#s11-clipn)">""" + lluvia("s11-lluvian", 22, 360, 720, 840, 520, 122, globos=0.55, vel=(500, 700), esc=(0.9, 1.3), ang=0) + """</g>
            <g class="s11-wchico"><g transform="translate(450 1040) scale(0.5)">""" + WALTER("s11b") + """</g></g>
            <g class="s11-nube"><g transform="translate(540 830) scale(0.9)">""" + NUBE("k") + """</g></g>
            <g class="s11-movchico"><g transform="translate(760 1060) scale(0.5)">""" + MOVILERO("s11b") + """</g></g>
            """ + MIC("s11b", 700, 1110, -50) + """
          </g>
        </svg>
        <div class="cartela s11-lento">¿LENTO?</div>
        <div class="s11-solo">SOLO</div>
"""
JS = """
      const LENTO = 0.48, NO = 2.26, USTED = 2.99, SOLO = 3.80;
      lluvia(".s11-lluvia", 0, NO + 0.2);
      lluvia(".s11-lluvian", NO, DUR);
      // ofendido: se señala
      habla(".s11-boca", 0, 0.9, "180 300");
      tl.fromTo(q(".s11-cejas"), { y: 0 }, { y: 8, rotation: 0, duration: 0.15, ease: "power2.out" }, 0.1);
      tl.fromTo(q(".s11-brazo-d"), { rotation: 0, svgOrigin: "290 430" }, { rotation: -70, svgOrigin: "290 430", duration: 0.25, ease: "back.out(2)" }, 0.05);
      tl.fromTo(q(".s11-walter"), { x: 0 }, { x: -10, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, LENTO);
      golpe(".s11-lento", LENTO, 2.2);
      gsap.set(q(".s11-caracol"), { opacity: 0 });
      tl.fromTo(q(".s11-caracol"), { opacity: 1, x: 300 }, { opacity: 1, x: 0, duration: 1.4, ease: "power1.out", immediateRender: false }, LENTO + 0.2);
      // no, Walter: la cámara se aleja y queda solo bajo su nube
      tl.to(q(".s11-a"), { scale: 0.4, opacity: 0, svgOrigin: "540 1000", duration: 0.35, ease: "power3.in" }, NO - 0.2);
      tl.to(q(".s11-lento"), { opacity: 0, duration: 0.2 }, NO - 0.2);
      gsap.set(q(".s11-b"), { opacity: 0 });
      tl.fromTo(q(".s11-b"), { opacity: 1, scale: 1.8, svgOrigin: "540 1000" }, { opacity: 1, scale: 1, svgOrigin: "540 1000", duration: 0.6, ease: "power3.out", immediateRender: false }, NO + 0.1);
      tl.fromTo(q(".s11-nube"), { y: 0 }, { y: 10, duration: 0.4, yoyo: true, repeat: 7, ease: "sine.inOut", immediateRender: false }, NO + 0.6);
      tl.fromTo(q(".s11b-gotas"), { y: 0, opacity: 1 }, { y: 40, opacity: 0, duration: 0.45, repeat: 6, ease: "power1.in", immediateRender: false }, NO + 0.4);
      // el movilero le pone el micrófono de paraguas (no sirve)
      tl.fromTo(q(".s11b-mic"), { x: 0, y: 0 }, { x: -170, y: -50, duration: 0.4, ease: "power2.out", immediateRender: false }, USTED);
      tl.to(q(".s11b-mic"), { rotation: -6, svgOrigin: "700 1110", duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, USTED + 0.4);
      golpe(".s11-solo", SOLO, 2.2);
      tl.to(q(".s11-solo"), { scale: 1.05, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, SOLO + 0.3);
"""
SFX = [{"t": 0.48, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.5}, {"t": 0.8, "sfx": "click-soft", "vol": 0.2}, {"t": 2.1, "sfx": "whoosh-cinematic", "vol": 0.25, "max": 1.0}, {"t": 3.0, "sfx": "whoosh-short", "vol": 0.22}, {"t": 3.8, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.7}]
