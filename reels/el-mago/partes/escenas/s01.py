ID = "s01-truco"; DUR = 6.21
CSS = """
    $ .s01-tres { position: absolute; left: 0; right: 0; top: 590px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; line-height: 0.9; text-transform: uppercase; letter-spacing: -0.02em; }
    $ .s01-tres b { display: block; font-size: 170px; color: #e6e8f0; }
    $ .s01-tres i { display: block; font-style: normal; font-size: 170px; color: #ff4fa3; text-shadow: 0 0 34px rgba(255, 79, 163, 0.55); }
    $ .s01-vida { position: absolute; left: 640px; top: 1380px; padding: 12px 22px 10px; background: #e6e8f0; color: #0a0610; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; text-transform: uppercase; transform: rotate(-4deg); }
"""
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          """ + REFLECTOR("s01", "", 400, 1500, 330, 64, 400) + """
          <g class="s01-mago"><g transform="translate(100 860) scale(1.25)">""" + MAGO("s01") + """</g></g>
          """ + RELOJ("s01", "s01-rel", 830, 1170, 110, 11, 0) + """
          """ + HUMO("s01", "s01-puf", 830, 1170, 1.2) + """
          """ + DESTELLOS("s01", "s01-d1", [(605, 1062, 26), (680, 990, 18), (560, 1000, 14)]) + """
          """ + DESTELLOS("s01", "s01-d2", [(720, 1050, 30), (950, 1060, 24), (960, 1290, 28), (700, 1290, 20), (840, 990, 16)], "#ff4fa3") + """
        </svg>
        <div class="s01-tres"><b class="s01-t1">Tres</b><i class="s01-t2">horas</i></div>
        <div class="s01-vida">de tu vida</div>
"""
JS = """
      const TRUCO = 1.35, DESAP = 2.67, TRES = 3.08, HORAS = 4.46, VIDA = 5.17;
      // cuadro 0: el mago ya está, a media luz, y se acerca
      gsap.set(q(".s01-mago"), { opacity: 0.5 });
      tl.fromTo(q(".s01-mago"), { scale: 0.94, svgOrigin: "400 1500" }, { scale: 1, svgOrigin: "350 1500", duration: 1.4, ease: "power2.out" }, 0);
      tl.to(q(".s01-mago"), { opacity: 1, duration: 0.3 }, 0.15);
      tl.fromTo(q(".s01-haz"), { opacity: 0.04 }, { opacity: 0.16, duration: 0.4, ease: "power2.out" }, 0);
      habla(".s01-boca", 0, 1.2, "180 300");
      tl.fromTo(q(".s01-ceja"), { y: 0 }, { y: -10, duration: 0.2, yoyo: true, repeat: 3, immediateRender: false }, 0.3);
      // "truco": la varita tira chispas
      tl.fromTo(q(".s01-brazo"), { rotation: 0, svgOrigin: "276 418" }, { rotation: -14, svgOrigin: "276 418", duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut", immediateRender: false }, TRUCO - 0.1);
      destello(".s01-d1 path", TRUCO, 2);
      // aparece el reloj (las tres horas)
      pop(".s01-rel", DESAP - 0.3);
      tl.fromTo(q(".s01-aguja-m"), { rotation: 0, svgOrigin: "830 1170" }, { rotation: 1080, svgOrigin: "830 1170", duration: 2.2, ease: "power1.in", immediateRender: false }, DESAP);
      tl.fromTo(q(".s01-aguja-h"), { rotation: 0, svgOrigin: "830 1170" }, { rotation: 90, svgOrigin: "830 1170", duration: 2.2, ease: "power1.in", immediateRender: false }, DESAP);
      habla(".s01-boca", DESAP, 2.2, "180 300");
      // TRES HORAS
      gsap.set(q(".s01-t2"), { opacity: 0 });
      golpe(".s01-t1", TRES, 2.2);
      sacudon(TRES + 0.04, 0.8);
      golpe(".s01-t2", HORAS, 2.4);
      sacudon(HORAS + 0.04, 1.2);
      tl.to(q(".s01-rel"), { scale: 1.15, svgOrigin: "830 1170", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, TRES + 0.3);
      // "de tu vida": ¡puf! el reloj desaparece
      tl.to(q(".s01-brazo"), { rotation: -30, svgOrigin: "276 418", duration: 0.15, ease: "power3.out" }, VIDA - 0.3);
      puf(".s01-puf", VIDA - 0.1);
      tl.to(q(".s01-rel"), { opacity: 0, scale: 0.3, svgOrigin: "830 1170", duration: 0.2, ease: "power2.in" }, VIDA);
      destello(".s01-d2 path", VIDA + 0.05, 2);
      pop(".s01-vida", VIDA, { rotation: -4 });
      tl.to(q(".s01-tres"), { scale: 1.05, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, VIDA + 0.2);
"""
SFX = [{"t": 0.05, "sfx": "sparkle", "vol": 0.3}, {"t": 1.35, "sfx": "sparkle", "vol": 0.28}, {"t": 2.5, "sfx": "pop", "vol": 0.25}, {"t": 3.08, "sfx": "impact-bass-1", "vol": 0.38, "max": 0.7}, {"t": 4.46, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}, {"t": 5.07, "sfx": "whoosh", "vol": 0.3}, {"t": 5.2, "sfx": "chime", "vol": 0.25, "max": 1.0}]
