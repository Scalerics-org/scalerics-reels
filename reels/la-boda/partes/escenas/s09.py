from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-nov { left: 340px; top: 760px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s09-t { top: 600px; font-size: 124px; }
    [data-composition-id="%ID%"] .s09-novio { left: 10px; top: 800px; transform-origin: 50% 100%; }
    [data-composition-id="%ID%"] .s09-cel { left: 520px; top: 700px; }
    [data-composition-id="%ID%"] .s09-hora { position: absolute; left: 60px; top: 600px; padding: 14px 26px 8px; background: #2a1220; border: 6px solid #e3b448; border-radius: 20px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 64px; color: #e3b448; }
    [data-composition-id="%ID%"] .s09-res { left: 40px; top: 1300px; font-size: 52px; color: #e3b448; padding: 12px 30px 6px; border-width: 8px; }
    [data-composition-id="%ID%"] .s09-noti { position: absolute; left: 480px; top: 580px; width: 560px; padding: 18px 24px 14px 96px; background: #e3b448; border: 6px solid #2a1220; border-radius: 26px; box-shadow: 8px 8px 0 #2a1220; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 34px; line-height: 1.15; color: #2a1220; }
    [data-composition-id="%ID%"] .s09-noti i { position: absolute; left: 22px; top: 22px; width: 56px; height: 56px; border-radius: 14px; background: #9b2445; border: 4px solid #2a1220; }
    [data-composition-id="%ID%"] .s09-noti small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 22px; opacity: 0.75; }
"""
cors = "".join(corazon("s09-c", x, y, s, c) for x, y, s, c in [(200, 900, 1.3, R), (880, 860, 1.6, V), (150, 1250, 1.0, D), (930, 1250, 1.2, R), (540, 760, 0.8, M)])
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{cors}</svg>
        <div class="fig s09-nov">{novia('s09n')}</div>
        <div class="big r s09-t">¡Me contesta!</div>
        <div class="fig s09-novio">{novio('s09v')}</div>
        <div class="s09-hora">23:00</div>
        <div class="cel s09-cel" style="width:480px;height:780px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>Lucía</b><small>en línea</small></div>
          <div class="msg el s09-m1" style="top:170px">¿Tenés las botas en 38?<small>22:58</small></div>
          <div class="msg yo s09-m2" style="top:320px">¡Hola, Lucía! Sí, tenemos<small>23:00</small></div>
          <div class="msg yo s09-m3" style="top:460px">Te las reservo a tu nombre<small>23:00</small></div>
          <div class="msg el s09-m4" style="top:600px">¡Sos un sol!<small>23:01</small></div>
        </div></div>
        <div class="sello s09-res">Reservadas</div>
        <div class="s09-noti"><i></i>¡Llegaron tus botas en 38!<small>EL DE ENFRENTE · AHORA</small></div>
"""
js = """
      const CONTESTA = 0.70, A = 1.47, CONTESTE = 2.56, RESERVE = 4.02, ENTRO = 5.56, AVISE = 6.38;
      // A: ¡me contesta! (cuadro 0: Lucía grande, enamorada)
      gsap.set(q(".s09-nov"), { scale: 1.15 });
      gsap.set(q(".s09n-bd"), { rotation: -150, svgOrigin: "248 296" });
      habla(".s09n-boca", 0.0, 1.3, "200 238");
      tl.fromTo(q(".s09-nov"), { rotation: -3 }, { rotation: 3, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0);
      golpe(q(".s09-t"), CONTESTA, -4, 2.8);
      sacudon(CONTESTA + 0.05, 1.6);
      qa(".s09-c").forEach((c, i) => { gsap.set(c, { opacity: 0 }); tl.fromTo(c, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, CONTESTA + i * 0.06); });
      tl.to([q(".s09-nov"), q(".s09-t"), ...qa(".s09-c")], { opacity: 0, y: -60, duration: 0.2, ease: "power2.in" }, A - 0.2);
      // B: el novio con el celular
      entra(q(".s09-novio"), A, { x: -500 }, 0.35);
      gsap.set(q(".s09v-bd"), { rotation: -40, svgOrigin: "250 292" });
      habla(".s09v-boca", A + 0.1, 5.3, "200 240");
      vaiven(q(".s09-novio"), A + 0.4, 5, { rotation: 2 }, 0.45);
      pop(q(".s09-hora"), A + 0.1, 0.3);
      tl.to(q(".s09-hora"), { rotation: -4, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, A + 0.4);
      entra(q(".s09-cel"), A + 0.1, { x: 700 }, 0.35);
      pop(q(".s09-m1"), A + 0.5, 0.25, { transformOrigin: "0% 100%" });
      pop(q(".s09-m2"), CONTESTE, 0.3, { transformOrigin: "100% 100%" });
      pop(q(".s09-m3"), RESERVE, 0.3, { transformOrigin: "100% 100%" });
      golpe(q(".s09-res"), RESERVE + 0.45, -6, 2.2);
      pop(q(".s09-m4"), RESERVE + 0.9, 0.25, { transformOrigin: "0% 100%" });
      // la notificación cuando entró el 38
      gsap.set(q(".s09-noti"), { opacity: 0 });
      tl.fromTo(q(".s09-noti"), { opacity: 1, y: -260 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, ENTRO);
      tl.to(q(".s09-hora"), { opacity: 0, duration: 0.2 }, ENTRO);
      tl.to(q(".s09v-ojod"), { opacity: 0, duration: 0.05 }, AVISE);
      tl.to(q(".s09v-guino"), { opacity: 1, duration: 0.05 }, AVISE);
      tl.to(q(".s09v-bi"), { rotation: 130, svgOrigin: "150 292", duration: 0.25, ease: "back.out(2)" }, AVISE);
"""
sfx = [{"t": 0.65, "sfx": "impact-bass-2", "vol": 0.4, "max": 0.7}, {"t": 0.75, "sfx": "sparkle", "vol": 0.25},
       {"t": 2.56, "sfx": "notification", "vol": 0.25}, {"t": 4.02, "sfx": "notification", "vol": 0.22}, {"t": 4.4, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5},
       {"t": 5.56, "sfx": "ping", "vol": 0.3}, {"t": 6.4, "sfx": "click-soft", "vol": 0.3}]
escena("s09-contesta", p, 7.03, css, body, js, sfx)
