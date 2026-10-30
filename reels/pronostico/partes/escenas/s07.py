ID = "s07-clienta"; DUR = 6.48
CSS = """
    $ .s07-tel { position: absolute; left: 470px; top: 570px; width: 560px; height: 790px; border: 7px solid #f4f6fb; border-radius: 56px; background: #0b2547; overflow: hidden; }
    $ .s07-chat { position: absolute; inset: 0; }
    $ .s07-head { position: absolute; left: 0; right: 0; top: 0; height: 130px; padding: 52px 30px 0; background: #14457a; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 34px; color: #f4f6fb; white-space: nowrap; }
    $ .s07-head small { margin-left: 12px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 26px; color: #5ec8ff; }
    $ .s07-msg { position: absolute; max-width: 420px; padding: 18px 24px; border-radius: 26px; font-family: "Lexend", sans-serif; font-weight: 600; font-size: 34px; line-height: 1.2; }
    $ .s07-out { right: 26px; background: #ffd23f; color: #061428; border-bottom-right-radius: 6px; }
    $ .s07-in { left: 26px; background: #f4f6fb; color: #061428; border-bottom-left-radius: 6px; }
    $ .s07-visto { position: absolute; right: 30px; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 28px; color: #5ec8ff; }
    $ .s07-nada { position: absolute; left: 0; right: 0; top: 860px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 200px; line-height: 1; color: #5ec8ff; text-shadow: 10px 10px 0 #061428; }
    $ .s07-eco { opacity: 0.3; }
    $ .s07-sello { position: absolute; left: 560px; top: 1180px; padding: 10px 24px 6px; border: 8px solid #5ce611; border-radius: 14px; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 60px; color: #5ce611; background: #061428; transform: rotate(-10deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <defs><clipPath id="s07-clip"><rect x="0" y="520" width="1080" height="900" /></clipPath></defs>
          <g clip-path="url(#s07-clip)" opacity="0.55">""" + lluvia("s07-lluvia", 40, -300, 1300, 420, 1000, 77, globos=0.35, vel=(900, 1200), esc=(0.8, 1.2), ang=14) + """</g>
          <path d="M-40 760 L20 640 H560 L620 760 Z" fill="#ffd23f" stroke="#f4f6fb" stroke-width="7" stroke-linejoin="round" />
          <path d="M80 640 L50 760 M200 640 L180 760 M320 640 L320 760 M440 640 L460 760" stroke="#061428" stroke-width="6" />
          <g class="s07-cli"><g transform="translate(20 830) scale(0.95)">""" + CLIENTA("s07") + """
            <path class="l s07-brazo" d="M300 440 C360 420 400 380 420 330" stroke-width="16" />
          </g></g>
        </svg>
        <div class="s07-tel">
          <div class="s07-chat s07-c1">
            <div class="s07-head">Local de Walter</div>
            <div class="s07-msg s07-out" style="top:190px">¿Tienen talle M?</div>
            <div class="s07-visto" style="top:290px">visto 22:51 ✓✓</div>
          </div>
          <div class="s07-chat s07-c2">
            <div class="s07-head">El de enfrente<small>en línea</small></div>
            <div class="s07-msg s07-out" style="top:190px">¿Tienen talle M?</div>
            <div class="s07-msg s07-in s07-r1" style="top:310px">¡Sí! Talle M a $ 1.490</div>
            <div class="s07-msg s07-in s07-r2" style="top:450px">Te lo aparto. ¿Pasás mañana?</div>
          </div>
        </div>
        <div class="s07-nada"><span class="s07-eco" style="position:absolute;left:0;right:0;top:-30px">NADA</span>NADA</div>
        <div class="s07-sello">APARTADO</div>
"""
JS = """
      const TENIAN = 0.46, NADA = 1.57, ENFRENTE = 2.52, TOQUE = 3.76, APARTARON = 5.18;
      lluvia(".s07-lluvia", 0, DUR);
      tl.fromTo(q(".s07-cli"), { x: -60 }, { x: 0, duration: 0.4, ease: "power3.out" }, 0);
      habla(".s07-boca", 0.0, 1.5, "180 292");
      habla(".s07-boca", 2.5, 3.0, "180 292");
      tl.fromTo(q(".s07-tel"), { y: 60, opacity: 0.8 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      gsap.set(q(".s07-c2"), { opacity: 0 });
      pop(".s07-c1 .s07-out", TENIAN, { transformOrigin: "100% 100%" });
      pop(".s07-visto", 1.05);
      // nada
      tl.to(q(".s07-cli"), { y: 10, duration: 0.2, ease: "power2.out" }, NADA);
      golpe(".s07-nada", NADA, 2.2);
      tl.fromTo(q(".s07-eco"), { y: 0 }, { y: -40, opacity: 0, duration: 0.6, ease: "power2.out", immediateRender: false }, NADA + 0.1);
      tl.to(q(".s07-nada"), { opacity: 0, scale: 0.8, duration: 0.2 }, ENFRENTE - 0.3);
      // enfrente
      tl.to(q(".s07-c1"), { x: -560, duration: 0.3, ease: "power3.in" }, ENFRENTE - 0.1);
      tl.fromTo(q(".s07-c2"), { opacity: 1, x: 560 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out", immediateRender: false }, ENFRENTE);
      pop(".s07-r1", TOQUE - 0.1, { transformOrigin: "0% 100%" });
      tl.fromTo(q(".s07-r1"), { scale: 1 }, { scale: 1.06, duration: 0.15, yoyo: true, repeat: 1, ease: "sine.inOut", transformOrigin: "0% 100%", immediateRender: false }, 4.26);
      pop(".s07-r2", APARTARON - 0.4, { transformOrigin: "0% 100%" });
      golpe(".s07-sello", APARTARON + 0.1, 2.4);
      sacudon(APARTARON + 0.15, 0.8);
      tl.fromTo(q(".s07-brazo"), { rotation: 0, svgOrigin: "300 440" }, { rotation: -8, svgOrigin: "300 440", duration: 0.3, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, 2.6);
"""
SFX = [{"t": 0.46, "sfx": "key-press", "vol": 0.3}, {"t": 1.05, "sfx": "click-soft", "vol": 0.25}, {"t": 1.57, "sfx": "impact-bass-2", "vol": 0.3, "max": 0.6}, {"t": 2.45, "sfx": "whoosh-short", "vol": 0.25}, {"t": 3.66, "sfx": "notification", "vol": 0.35}, {"t": 4.78, "sfx": "notification", "vol": 0.3}, {"t": 5.28, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}]
