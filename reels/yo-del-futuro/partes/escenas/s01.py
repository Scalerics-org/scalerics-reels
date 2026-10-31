from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-fut { left: 340px; top: 690px; }
    [data-composition-id="%ID%"] .s01-most { left: 90px; top: 1190px; width: 900px; height: 300px; }
    [data-composition-id="%ID%"] .s01-soy { top: 560px; font-size: 190px; }
    [data-composition-id="%ID%"] .s01-reloj { left: 50%; top: 580px; width: 760px; margin-left: -380px; height: 170px; }
    [data-composition-id="%ID%"] .s01-reloj span { position: absolute; left: 0; right: 0; top: 66px; font-size: 64px; text-align: center; }
    [data-composition-id="%ID%"] .s01-la { top: 1225px; font-size: 120px; }
    [data-composition-id="%ID%"] .s01-pif { top: 1340px; font-size: 138px; }
"""
reloj = "<small>VIAJE · DESTINO</small>" + "".join(f'<span class="s01-dig">{x}</span>' for x in ["HOY", "+1 AÑO", "+2 AÑOS", "+3 AÑOS", "+4 AÑOS", "DENTRO DE 5 AÑOS"])
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true">{humo('s01-humo', 540, 1180, 70)}{chispas('s01-ch', 540, 980, 330, 10)}</svg>
        <div class="fig s01-fut">{futuro('s01f')}</div>
        <div class="obj s01-most">{mostrador('s01m')}</div>
        <div class="big cr s01-soy"><span>Soy vos</span></div>
        <div class="reloj s01-reloj">{reloj}</div>
        <div class="big cr s01-la"><span>La estás</span></div>
        <div class="big mg s01-pif"><span>pifiando</span></div>
"""
js = """
      const SOY = 0.0, CINCO = 1.30, ANOS = 1.65, Y = 2.73, PIF = 3.91;
      const fut = q(".s01-fut");
      // cuadro 0: el futuro ya asomando entre chispas y humo
      gsap.set(fut, { scale: 1.0, transformOrigin: "50% 100%", opacity: 0.6 });
      tl.to(fut, { scale: 1.12, opacity: 1, duration: 0.6, ease: "back.out(1.4)" }, 0);
      chispazo(qa(".s01-ch"), 0, 1.0);
      gsap.set(qa(".s01-humo"), { opacity: 0.55 });
      tl.fromTo(qa(".s01-humo"), { scale: 0.8, svgOrigin: "540 1180" }, { scale: 1.8, y: -160, opacity: 0, svgOrigin: "540 1180", duration: 2.2, ease: "power2.out", stagger: 0.08 }, 0);
      tl.fromTo(q(".s01m-neon"), { opacity: 1 }, { opacity: 0.35, duration: 0.07, ease: "steps(1)", yoyo: true, repeat: 9 }, 0);
      habla(".s01f-boca", 0, 4.6, "200 244");
      // SOY VOS
      gsap.set(q(".s01-soy"), { opacity: 1, scale: 1.12, rotation: -4 });
      tl.to(q(".s01-soy"), { scale: 1, duration: 0.18, ease: "power4.in" }, 0.05);
      sacudon(0.22, 1.3);
      tl.to(q(".s01-soy"), { scale: 1.05, duration: 0.2, yoyo: true, repeat: 3, ease: "sine.inOut" }, 0.4);
      // dentro de cinco años: el reloj rueda
      tl.to(q(".s01-soy"), { opacity: 0, y: -80, scale: 0.7, duration: 0.2, ease: "power2.in" }, CINCO - 0.25);
      pop(q(".s01-reloj"), CINCO - 0.1, 0.3);
      cuenta(qa(".s01-dig"), CINCO - 0.1, 0.08);
      tl.fromTo(q(".s01-reloj"), { scale: 1 }, { scale: 1.08, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, ANOS + 0.05);
      vaiven(fut, ANOS, 2, { y: -10 }, 0.4);
      // la estás pifiando: el dedo acusador
      tl.to(q(".s01-reloj"), { opacity: 0, y: -60, duration: 0.2, ease: "power2.in" }, PIF - 0.55);
      golpe(q(".s01-la"), PIF - 0.35, -3, 2.4);
      golpe(q(".s01-pif"), PIF + 0.05, 4, 3);
      sacudon(PIF + 0.08, 1.6);
      tl.to(q(".s01f-bd"), { rotation: -95, svgOrigin: "250 292", duration: 0.22, ease: "back.out(2.5)" }, PIF - 0.2);
      tl.to(fut, { scale: 1.2, duration: 0.25, ease: "back.out(2)" }, PIF);
      tl.to(q(".s01-pif"), { scale: 1.06, duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, PIF + 0.2);
"""
sfx = [{"t": 0.0, "sfx": "glitch-1", "vol": 0.4, "max": 0.8}, {"t": 0.15, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.8},
       {"t": 1.2, "sfx": "typing", "vol": 0.25, "max": 0.5}, {"t": 1.7, "sfx": "ping", "vol": 0.28},
       {"t": 3.55, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 3.95, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
escena("s01-llegada", p, 5.15, css, body, js, sfx)
