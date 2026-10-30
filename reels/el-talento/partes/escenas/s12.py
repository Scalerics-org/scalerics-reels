ID = "s12-dorado"; DUR = 5.21
CSS = """
    $ .s12-zoc { position: absolute; left: 50px; top: 1330px; width: 980px; }
    $ .s12-zoc span { display: inline-block; padding: 8px 18px 6px; background: #f6c544; color: #0b080b; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 28px; letter-spacing: 0.06em; }
    $ .s12-zoc div { padding: 14px 22px 12px; background: #fff3d6; border-left: 14px solid #f6c544; color: #0b080b; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 38px; text-transform: uppercase; }
    $ .s12-tit { position: absolute; left: 0; right: 0; top: 620px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 120px; line-height: 0.95; color: #f6c544; text-shadow: 0 0 30px rgba(246, 197, 68, 0.6); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s12-malo"><g transform="translate(234 600) scale(1.7)">""" + MALO("s12") + """
            <path class="w s12-sonrisa" d="M146 284 C162 316 204 316 218 280 C196 292 168 294 146 284 Z" stroke-width="5" />
          </g></g>
          """ + MESA("s12", 40, 1250, 1000, 200) + """
          <g class="s12-boton"><g transform="translate(540 1150) scale(2.4)">""" + BOTON_DORADO("s12", 0, 0, 70) + """</g></g>
          <g class="s12-mano"><g transform="translate(700 760)">
            <path class="l" d="M300 -300 C220 -160 120 -40 40 60" stroke-width="64" />
            <path d="M300 -300 C220 -160 120 -40 40 60" stroke="#ff2d3d" stroke-width="50" fill="none" stroke-linecap="round" />
            <circle class="b" cx="30" cy="80" r="62" />
          </g></g>
        </svg>
        <div class="s12-tit">¡BOTÓN<br>DORADO!</div>
        <div class="s12-zoc"><span>EXCLUSIVO</span><div>No sonreía desde el Maracanazo</div></div>
"""
JS = """
      const NO = 0, ME = 0.96, GUSTO = 2.29, BOTON = 3.43;
      tl.fromTo(q(".s12-malo"), { scale: 1.06, svgOrigin: "540 1250" }, { scale: 1, svgOrigin: "540 1250", duration: 1, ease: "power2.out" }, 0);
      habla(".s12-boca", 0, 0.8, "183 289");
      // se saca los anteojos
      tl.to(q(".s12-lentes"), { y: -120, opacity: 0, duration: 0.35, ease: "power2.in" }, 0.5);
      tl.fromTo(q(".s12-ceja"), { y: 0 }, { y: -12, duration: 0.2, immediateRender: false }, 0.4);
      // la sonrisa
      gsap.set(q(".s12-sonrisa"), { opacity: 0 });
      tl.to(q(".s12-boca"), { opacity: 0, duration: 0.1 }, GUSTO - 0.4);
      tl.fromTo(q(".s12-sonrisa"), { opacity: 0, scale: 0.4, svgOrigin: "182 296" }, { opacity: 1, scale: 1, svgOrigin: "182 296", duration: 0.3, ease: "back.out(3)", immediateRender: false }, GUSTO - 0.4);
      gsap.set(q(".s12-zoc"), { opacity: 0 });
      tl.fromTo(q(".s12-zoc"), { opacity: 0, x: -1000 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, ME + 0.3);
      tl.fromTo(q(".s12-malo"), { rotation: 0, svgOrigin: "540 1250" }, { rotation: 2, svgOrigin: "540 1250", duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, GUSTO);
      // botón dorado
      tl.to([q(".s12-malo"), q(".s12-zoc")], { opacity: 0, duration: 0.15 }, BOTON - 0.35);
      gsap.set(q(".s12-boton"), { opacity: 0 });
      tl.fromTo(q(".s12-boton"), { opacity: 0, y: 300 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(1.6)", immediateRender: false }, BOTON - 0.35);
      gsap.set(q(".s12-mano"), { opacity: 0 });
      tl.fromTo(q(".s12-mano"), { opacity: 1, x: 400, y: -400 }, { opacity: 1, x: 0, y: 0, duration: 0.18, ease: "power3.in", immediateRender: false }, BOTON - 0.1);
      tl.fromTo(q(".s12-bd-domo"), { scaleY: 1, svgOrigin: "0 20" }, { scaleY: 0.7, svgOrigin: "0 20", duration: 0.08, yoyo: true, repeat: 1, immediateRender: false }, BOTON + 0.08);
      tl.to(q(".s12-mano"), { x: 300, y: -300, opacity: 0, duration: 0.3, ease: "power2.in" }, BOTON + 0.45);
      golpe(".s12-tit", BOTON + 0.12, 2.4);
      sacudon(BOTON + 0.12, 1.4);
      tl.to(q(".s12-boton"), { scale: 1.06, svgOrigin: "540 1150", duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, BOTON + 0.6);
"""
SFX = [{"t": 0.45, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.3, "sfx": "click", "vol": 0.25}, {"t": 1.9, "sfx": "sparkle", "vol": 0.25}, {"t": 3.5, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 3.55, "sfx": "chime", "vol": 0.35, "max": 1.2}]
