from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-hoy { left: 340px; top: 790px; }
    [data-composition-id="%ID%"] .s11-cartel { position: absolute; left: 50%; top: 570px; width: 700px; margin-left: -350px; text-align: center; padding: 20px 0 14px; border: 10px solid #ff2a9d; border-radius: 26px; background: #120621;
      box-shadow: 0 0 40px 8px rgba(255, 42, 157, 0.6), inset 0 0 30px rgba(255, 42, 157, 0.5);
      font-family: "Lexend", sans-serif; font-weight: 900; font-size: 140px; line-height: 1; color: #ffd0e8; text-shadow: 0 0 20px #ff2a9d, 0 0 40px #ff2a9d; }
    [data-composition-id="%ID%"] .s11-hilo { left: 340px; top: 470px; width: 400px; height: 110px; }
"""
hilo = f'<svg viewBox="0 0 400 110"><path d="M40 110 L200 10 L360 110" fill="none" stroke="{W}" stroke-width="5"/><circle cx="200" cy="10" r="10" fill="{W}"/></svg>'
body = f"""
        <div class="fig s11-hoy">{hoy('s11h')}</div>
        <div class="obj s11-hilo">{hilo}</div>
        <div class="s11-cartel">CERRADO</div>
"""
js = """
      const PARA = 0, PARA2 = 0.18, ME = 0.81, CIERRE = 1.63;
      const hoy = q(".s11-hoy");
      gsap.set(hoy, { scale: 1.15, transformOrigin: "50% 100%" });
      tl.set([q(".s11h-susto"), q(".s11h-boca-o"), q(".s11h-gota")], { opacity: 1 }, 0);
      tl.set(q(".s11h-boca"), { opacity: 0 }, 0);
      tl.fromTo(q(".s11h-bi"), { rotation: 0, svgOrigin: "150 292" }, { rotation: 140, svgOrigin: "150 292", duration: 0.15, ease: "back.out(2)" }, 0);
      tl.fromTo(q(".s11h-bd"), { rotation: 0, svgOrigin: "250 292" }, { rotation: -140, svgOrigin: "250 292", duration: 0.15, ease: "back.out(2)" }, 0);
      tl.to(q(".s11h-bi"), { rotation: 120, svgOrigin: "150 292", duration: 0.09, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.2);
      tl.to(q(".s11h-bd"), { rotation: -120, svgOrigin: "250 292", duration: 0.09, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.2);
      tl.fromTo(hoy, { x: 0 }, { x: -12, duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, ME);
      tl.fromTo(q(".s11h-gota"), { y: 0 }, { y: 30, duration: 0.8, ease: "power1.in" }, 0.3);
      // CERRADO: el cartel de neón cae y queda colgando torcido
      gsap.set([q(".s11-cartel"), q(".s11-hilo")], { opacity: 0 });
      tl.fromTo(q(".s11-cartel"), { opacity: 1, y: -500 }, { opacity: 1, y: 0, duration: 0.18, ease: "power3.in", immediateRender: false }, CIERRE - 0.18);
      tl.set(q(".s11-hilo"), { opacity: 1 }, CIERRE);
      sacudon(CIERRE + 0.02, 1.6);
      tl.fromTo(q(".s11-cartel"), { rotation: 0 }, { rotation: 9, transformOrigin: "50% 0%", duration: 0.25, ease: "back.out(3)", immediateRender: false }, CIERRE + 0.05);
      tl.to(q(".s11-cartel"), { opacity: 0.35, duration: 0.06, yoyo: true, repeat: 5, ease: "steps(1)" }, CIERRE + 0.3);
"""
sfx = [{"t": 0.0, "sfx": "glitch-2", "vol": 0.25, "max": 0.4}, {"t": 1.5, "sfx": "whoosh-short", "vol": 0.22}, {"t": 1.62, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 1.95, "sfx": "glitch-1", "vol": 0.25, "max": 0.4}]
escena("s11-cierre", p, 2.68, css, body, js, sfx)
