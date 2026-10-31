from base import *
p = "s07"
css = """
    [data-composition-id="%ID%"] .s07-alm { position: absolute; left: 330px; top: 570px; width: 420px; height: 300px; background: #fbf4e6; border: 8px solid #2a1220; border-radius: 18px; box-shadow: 10px 10px 0 #9b2445; text-align: center; overflow: hidden; }
    [data-composition-id="%ID%"] .s07-alm i { display: block; height: 80px; background: #9b2445; border-bottom: 6px solid #2a1220; font-style: normal; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 46px; line-height: 80px; color: #fbf4e6; letter-spacing: 0.06em; }
    [data-composition-id="%ID%"] .s07-alm b { display: block; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 150px; line-height: 190px; color: #2a1220; }
    [data-composition-id="%ID%"] .s07-pul { left: 330px; top: 900px; width: 420px; height: 476px; }
    [data-composition-id="%ID%"] .s07-t { top: 1390px; font-size: 98px; }
    [data-composition-id="%ID%"] .s07-cura { left: 660px; top: 830px; transform-origin: 50% 100%; }
"""
rayos = "".join(f'<path class="s07-r" d="M540 1140 L{540 + 520 * __import__("math").cos(a / 12 * 6.283):.0f} {1140 + 520 * __import__("math").sin(a / 12 * 6.283):.0f}" stroke="{D}" stroke-width="18" stroke-linecap="round" opacity="0.5"/>' for a in range(12))
body = f"""
        <svg class="full" viewBox="0 0 1080 1920" aria-hidden="true"><g class="s07-rayos" data-layout-allow-overflow>{rayos}</g></svg>
        <div class="s07-alm"><i>MIÉRCOLES</i><b>17</b></div>
        <div class="obj s07-pul">{pulgar('s07p')}</div>
        <div class="big d s07-t">¡Un pulgar!</div>
        <div class="fig s07-cura">{cura('s07c')}</div>
"""
js = """
      const MIER = 0.16, PULGAR = 1.37, UN2 = 2.14;
      // cuadro 0: la hoja del almanaque ya cae
      tl.fromTo(q(".s07-alm"), { y: -120, rotation: -14 }, { y: 0, rotation: -4, duration: 0.45, ease: "bounce.out" }, 0);
      tl.to(q(".s07-alm"), { rotation: 3, duration: 0.3, yoyo: true, repeat: 3, ease: "sine.inOut" }, MIER + 0.4);
      // el pulgar gigante
      gsap.set(q(".s07-rayos"), { opacity: 0 });
      golpe(q(".s07-pul"), PULGAR, -8, 3.2);
      sacudon(PULGAR + 0.05, 2.2);
      tl.to(q(".s07-rayos"), { opacity: 1, duration: 0.1 }, PULGAR);
      tl.to(q(".s07-rayos"), { rotation: 30, svgOrigin: "540 1140", duration: 2.3, ease: "none" }, PULGAR);
      tl.to(q(".s07-pul"), { rotation: 4, scale: 1.05, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, PULGAR + 0.1);
      golpe(q(".s07-t"), PULGAR + 0.2, 3, 2.2);
      // el padre asoma, horrorizado
      gsap.set(q(".s07-cura"), { opacity: 0 });
      tl.fromTo(q(".s07-cura"), { opacity: 1, x: 500, rotation: 12 }, { opacity: 1, x: 0, rotation: -6, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, UN2 - 0.15);
      tl.to([q(".s07-pul"), q(".s07-alm"), q(".s07-t")], { x: -110, duration: 0.3, ease: "power2.out" }, UN2 - 0.15);
      gsap.set(q(".s07c-libreta"), { y: 0 });
      tl.to(q(".s07c-libreta"), { y: -140, duration: 0.25, ease: "back.out(2)" }, UN2);
      tl.to(q(".s07c-cejas"), { y: -14, duration: 0.15 }, UN2);
      tl.fromTo(q(".s07c-boca"), { scaleY: 1, scaleX: 1, svgOrigin: "200 242" }, { scaleY: 3, scaleX: 0.8, svgOrigin: "200 242", duration: 0.2, immediateRender: false }, UN2);
      vaiven(q(".s07-cura"), UN2 + 0.3, 1.2, { rotation: -2 }, 0.15);
"""
sfx = [{"t": 0.05, "sfx": "whoosh-short", "vol": 0.25}, {"t": 0.4, "sfx": "click", "vol": 0.25},
       {"t": 1.3, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.45, "sfx": "glitch-1", "vol": 0.22, "max": 0.4},
       {"t": 2.05, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 2.2, "sfx": "pop", "vol": 0.3}]
escena("s07-pulgar", p, 3.74, css, body, js, sfx)
