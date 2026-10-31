ID = "s03-sillon"; DUR = 2.83
CSS = """
    $ .s03-cart { position: absolute; left: 520px; top: 640px; width: 480px; text-align: center; }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + HAZ("s03", "s03-h", 760, 760, 60, 560, 520, 1500, "#ffb547") + """
          <g class="s03-nico"><g transform="translate(-10 930) scale(1.0)">""" + NICO("s03", tarjeta=False) + """</g></g>
          """ + ESCRITORIO("s03", -20, 1310, 440, 210) + """
          """ + SILLON("s03", 500, 960, 520, 460) + """
          <g class="s03-ag"><g transform="translate(580 820) scale(1.0)">""" + AGENTE("s03", lentes=True, sentado=True) + """</g></g>
          """ + SILLON_BRAZOS("s03", 500, 960, 520, 460) + """
          <g class="s03-brillos">
            <path d="M560 700 l12 30 l30 12 l-30 12 l-12 30 l-12 -30 l-30 -12 l30 -12 Z" fill="#ffb547" />
            <path d="M960 760 l9 22 l22 9 l-22 9 l-9 22 l-9 -22 l-22 -9 l22 -9 Z" fill="#fff1dc" />
            <path d="M930 640 l7 17 l17 7 l-17 7 l-7 17 l-7 -17 l-17 -7 l17 -7 Z" fill="#5ce611" />
          </g>
        </svg>
"""
JS = """
      const NICO = 0.46, PUBLICO = 1.64;
      tl.fromTo(q(ESC), { scale: 1.08, transformOrigin: "70% 60%" }, { scale: 1, transformOrigin: "70% 60%", duration: 0.8, ease: "power3.out", immediateRender: false }, 0);
      // se saca los lentes (suben y se van)
      tl.to(q(".s03-ag-lentes"), { y: -150, rotation: -20, svgOrigin: "180 190", opacity: 0, duration: 0.4, ease: "power2.in" }, 0.2);
      habla(".s03-ag-boca", 0, 2.2, "180 260");
      tl.fromTo(q(".s03-ag-bd"), { rotation: 0, svgOrigin: "276 372" }, { rotation: -80, svgOrigin: "276 372", duration: 0.2, ease: "back.out(2)", immediateRender: false }, PUBLICO - 0.3);
      tl.fromTo(q(".s03-ag-bd"), { rotation: -80, svgOrigin: "276 372" }, { rotation: -55, svgOrigin: "276 372", duration: 0.16, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, PUBLICO - 0.1);
      tl.fromTo(qa(".s03-brillos path"), { scale: 0, opacity: 0, transformOrigin: "50% 50%" }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.12, ease: "back.out(3)", immediateRender: false, transformOrigin: "50% 50%" }, PUBLICO - 0.2);
      gsap.set(qa(".s03-brillos path"), { opacity: 0 });
      tl.fromTo(q(".s03-ag-ant"), { scale: 1, transformOrigin: "50% 50%" }, { scale: 1.5, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false, transformOrigin: "50% 50%" }, 0.3);
      tl.fromTo(q(".s03-boca"), { scaleY: 1, svgOrigin: "180 284" }, { scaleY: 1.3, svgOrigin: "180 284", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, 0.4);
"""
SFX = [{"t": 0.2, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.45, "sfx": "sparkle", "vol": 0.3}]
