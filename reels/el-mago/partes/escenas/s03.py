ID = "s03-voluntario"; DUR = 7.40
CSS = """
    $ .s03-titulo { position: absolute; left: 60px; right: 60px; top: 600px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; text-transform: uppercase; line-height: 0.92; }
    $ .s03-titulo small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 32px; letter-spacing: 0.34em; color: #c3a2ff; margin-bottom: 14px; }
    $ .s03-titulo b { display: block; font-size: 112px; color: #e6e8f0; }
    $ .s03-titulo i { display: block; font-style: normal; font-size: 112px; color: #ff4fa3; text-shadow: 0 0 30px rgba(255, 79, 163, 0.55); }
    $ .s03-local { position: absolute; left: 600px; top: 760px; }
    $ .s03-noti { position: absolute; left: 600px; width: 400px; padding: 16px 20px 14px; background: #e6e8f0; border-left: 12px solid #45dcf0; border-radius: 16px; font-family: "Lexend", sans-serif; font-weight: 700; font-size: 32px; color: #0a0610; }
    $ .s03-noti small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 500; font-size: 24px; color: #2b1250; }
"""
butacas = "".join(f'<g class="s03-pub"><circle cx="{x}" cy="{y}" r="44" fill="#0a0610" stroke="#c3a2ff" stroke-width="5" /><path d="M{x-70} {y+130} C{x-70} {y+60} {x+70} {y+60} {x+70} {y+130} Z" fill="#0a0610" stroke="#c3a2ff" stroke-width="5" /></g>' for x, y in [(110, 1230), (330, 1250), (770, 1250), (990, 1230)])
HTML = """
        <svg viewBox="0 0 1080 1920" aria-hidden="true">
          <g class="s03-asis"><g transform="translate(40 860) scale(1.25)">""" + ASISTENTE("s03") + """</g></g>
          """ + DESTELLOS("s03", "s03-d1", [(120, 620, 26), (960, 640, 30), (900, 960, 18), (200, 980, 16)], "#ff4fa3") + """
          <g class="s03-sala">
            <path class="haz s03-foco" d="M520 0 L600 0 L700 1400 L420 1400 Z" />
            """ + butacas + """
            <g class="s03-el"><g transform="translate(420 1110) scale(0.62)">""" + DUENO("s03") + """</g></g>
            <path class="b" d="M40 1420 H1040 V1460 H40 Z" />
          </g>
          <g class="s03-esc"><g transform="translate(300 860) scale(1.25)">""" + DUENO("s03b") + """</g></g>
        </svg>
        <div class="s03-titulo"><small>Esta noche</small><b>El Gran</b><i>Maximiliano</i></div>
        """ + CARTEL("s03", "s03-cl", 640, 980, "El del local", "#45dcf0", "#0a0610", 44, -4) + """
        <div class="s03-noti s03-n1" style="top:640px"><small>WHATSAPP</small>Pedido nuevo</div>
        <div class="s03-noti s03-n2" style="top:780px"><small>WHATSAPP</small>¿Tenés de carne?</div>
        <div class="s03-noti s03-n3" style="top:920px"><small>WHATSAPP</small>¿Está listo?</div>
"""
JS = """
      const MAXI = 0.33, NECESITA = 1.07, VOLUNTARIO = 1.89, USTED = 2.87, LOCAL = 3.86, BUENO = 4.63, RAPIDITO = 5.56, PEDIDOS = 6.49;
      // la asistente presenta
      tl.fromTo(q(".s03-asis"), { x: -120, opacity: 0.6 }, { x: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      habla(".s03-boca", 0, 2.6, "180 292");
      tl.fromTo(q(".s03-brazo"), { rotation: 20, svgOrigin: "268 420" }, { rotation: -10, svgOrigin: "268 420", duration: 0.3, ease: "back.out(2)" }, 0.1);
      golpe(".s03-titulo", MAXI, 2.0);
      sacudon(MAXI + 0.04, 0.8);
      destello(".s03-d1 path", MAXI + 0.1, 3);
      // voluntario: el foco barre al público
      gsap.set(q(".s03-sala"), { opacity: 0 });
      tl.to([q(".s03-titulo"), q(".s03-asis")], { opacity: 0, y: -60, duration: 0.25, ease: "power2.in" }, VOLUNTARIO - 0.3);
      tl.to(q(".s03-sala"), { opacity: 1, duration: 0.2 }, VOLUNTARIO - 0.1);
      tl.fromTo(q(".s03-foco"), { rotation: 30, svgOrigin: "560 0" }, { rotation: -22, svgOrigin: "560 0", duration: 0.5, ease: "sine.inOut", immediateRender: false }, VOLUNTARIO);
      tl.to(q(".s03-foco"), { rotation: 0, svgOrigin: "560 0", duration: 0.35, ease: "back.out(2)" }, USTED - 0.4);
      tl.fromTo(q(".s03-el"), { opacity: 0.4 }, { opacity: 1, duration: 0.1, immediateRender: false }, USTED - 0.05);
      tl.fromTo(q(".s03-foco"), { opacity: 0.09 }, { opacity: 0.2, duration: 0.1, immediateRender: false }, USTED - 0.05);
      pop(".s03-cl", LOCAL - 0.1, { rotation: -4 });
      tl.fromTo(q(".s03-el"), { y: 0 }, { y: -18, duration: 0.15, yoyo: true, repeat: 3, immediateRender: false }, LOCAL);
      // "bueno, pero rapidito": sube al escenario con el celular
      gsap.set(q(".s03-esc"), { opacity: 0 });
      tl.to([q(".s03-sala"), q(".s03-cl")], { opacity: 0, duration: 0.2 }, BUENO - 0.2);
      tl.fromTo(q(".s03-esc"), { opacity: 1, x: -900 }, { opacity: 1, x: -170, duration: 0.3, ease: "back.out(1.4)", immediateRender: false }, BUENO - 0.1);
      habla(".s03b-boca", BUENO, 2.5, "180 294");
      tl.fromTo(q(".s03b-pantalla"), { opacity: 0.5 }, { opacity: 1, duration: 0.15, yoyo: true, repeat: 7, immediateRender: false }, RAPIDITO);
      pop(".s03-n1", RAPIDITO - 0.2, { x: 80 }); pop(".s03-n2", PEDIDOS - 0.35, { x: 80 }); pop(".s03-n3", PEDIDOS, { x: 80 });
"""
SFX = [{"t": 0.3, "sfx": "impact-bass-2", "vol": 0.38, "max": 0.7}, {"t": 0.4, "sfx": "sparkle", "vol": 0.3}, {"t": 1.85, "sfx": "whoosh", "vol": 0.28}, {"t": 2.85, "sfx": "click", "vol": 0.3}, {"t": 3.8, "sfx": "pop", "vol": 0.28}, {"t": 4.55, "sfx": "whoosh-short", "vol": 0.25}, {"t": 5.4, "sfx": "notification", "vol": 0.3}, {"t": 6.2, "sfx": "notification", "vol": 0.28}, {"t": 6.5, "sfx": "notification", "vol": 0.28}]
