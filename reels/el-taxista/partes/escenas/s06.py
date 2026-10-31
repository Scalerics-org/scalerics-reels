from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-av { position: absolute; left: 50%; top: 150px; width: 200px; height: 200px; margin-left: -100px; border-radius: 50%; background: #ff9a3c; border: 7px solid #0b0f1a; }
    [data-composition-id="%ID%"] .s06-av b { position: absolute; left: 0; right: 0; top: 40px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 100px; line-height: 1; color: #0b0f1a; }
    [data-composition-id="%ID%"] .s06-lla { position: absolute; left: 0; right: 0; top: 390px; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.16em; color: #f4ecd8; }
    [data-composition-id="%ID%"] .s06-nom { position: absolute; left: 0; right: 0; top: 440px; text-align: center; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 40px; line-height: 1.1; color: #fff; }
    [data-composition-id="%ID%"] .s06-cel .cel-pant { background: #1d2f55; }
    [data-composition-id="%ID%"] .s06-colgar { position: absolute; left: 50%; bottom: 60px; width: 120px; height: 120px; margin-left: -60px; border-radius: 50%; background: #ff3b30; border: 6px solid #0b0f1a; }
    [data-composition-id="%ID%"] .s06-rin { font-size: 116px; }
    [data-composition-id="%ID%"] .s06-r1 { top: 600px; left: -380px; }
    [data-composition-id="%ID%"] .s06-r2 { top: 1180px; left: 360px; }
    [data-composition-id="%ID%"] .s06-sin { left: 150px; top: 1080px; color: #ff3b30; font-size: 70px; }
    [data-composition-id="%ID%"] .s06-tax { left: 600px; top: 900px; transform-origin: 50% 100%; }
"""
ondas = "".join(f'<circle class="s06-onda" cx="540" cy="1000" r="{300 + i * 60}" fill="none" stroke="{L}" stroke-width="8"/>' for i in range(3))
pant = '<div class="s06-av"><b>N</b></div><div class="s06-lla">LLAMANDO...</div><div class="s06-nom">Lo de<br>Doña Nélida</div><div class="s06-colgar"></div>'
body = f"""
        <svg class="full" viewBox="0 0 1080 1920">{ondas}</svg>
        {celular('s06-cel', 420, 780, pant, 330, 610)}
        <div class="big y s06-rin s06-r1">RIIING</div>
        <div class="big y s06-rin s06-r2">RIIING</div>
        <div class="sello s06-sin">NO ATIENDE NADIE</div>
"""
js = """
      const SUENA = 0.92, SUENA2 = 1.48, SIN = 2.0;
      const cel = q(".s06-cel");
      tl.fromTo(cel, { y: 200, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.6)" }, 0);
      tl.fromTo(q(".s06-lla"), { opacity: 1 }, { opacity: 0.3, duration: 0.3, yoyo: true, repeat: 7, immediateRender: false }, 0.2);
      // vibra y suena
      [SUENA, SUENA2].forEach((t) => {
        tl.to(cel, { rotation: 4, duration: 0.04, yoyo: true, repeat: 7, ease: "none" }, t);
        qa(".s06-onda").forEach((o, i) => tl.fromTo(o, { scale: 0.6, opacity: 0.9, svgOrigin: "540 1000" }, { scale: 1.3, opacity: 0, svgOrigin: "540 1000", duration: 0.5, ease: "power1.out", immediateRender: false }, t + i * 0.08));
      });
      qa(".s06-onda").forEach((o) => gsap.set(o, { opacity: 0 }));
      golpe(q(".s06-r1"), SUENA + 0.05, -8, 2);
      golpe(q(".s06-r2"), SUENA2 + 0.05, 6, 2);
      tl.to([q(".s06-r1"), q(".s06-r2")], { opacity: 0.25, duration: 0.2 }, SIN - 0.1);
      golpe(q(".s06-sin"), SIN, -6, 2.6);
      sacudon(SIN + 0.02, 1);
"""
sfx = [{"t": 0.0, "sfx": "key-press", "vol": 0.3}, {"t": 0.92, "sfx": "notification", "vol": 0.3}, {"t": 1.48, "sfx": "notification", "vol": 0.3},
       {"t": 2.0, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}]
escena("s06-llamada", p, 2.64, css, body, js, sfx)
