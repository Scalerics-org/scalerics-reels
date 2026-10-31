from base import *
p = "s02"
css = """
    [data-composition-id="%ID%"] .s02-pas { left: 40px; top: 860px; }
    [data-composition-id="%ID%"] .s02-cartel { position: absolute; left: 140px; top: 560px; width: 800px; padding: 18px 0 14px; text-align: center; background: #0b0f1a; border: 8px solid #ff9a3c; border-radius: 18px;
      box-shadow: 0 0 40px rgba(255, 154, 60, 0.45); font-family: "Lexend", sans-serif; font-weight: 900; font-size: 72px; line-height: 1; color: #ff9a3c; white-space: nowrap; }
    [data-composition-id="%ID%"] .s02-cartel small { display: block; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 28px; letter-spacing: 0.3em; color: #f4ecd8; margin-bottom: 8px; }
    [data-composition-id="%ID%"] .s02-existe { top: 600px; font-size: 170px; }
    [data-composition-id="%ID%"] .s02-torta { left: 540px; top: 900px; width: 480px; height: 500px; }
    [data-composition-id="%ID%"] .s02-cumple { left: 560px; top: 1410px; font-size: 30px; color: #ffc81a; }
    [data-composition-id="%ID%"] .s02-corona { left: 690px; top: 800px; width: 180px; height: 130px; }
    [data-composition-id="%ID%"] .s02-mejor { left: 530px; top: 1080px; color: #ffc81a; font-size: 64px; }
"""
corona = f'<svg viewBox="0 0 180 130"><path d="M14 110 L24 30 L62 74 L90 14 L118 74 L156 30 L166 110 Z" fill="{Y}" {S}/><circle cx="90" cy="90" r="10" fill="{R}" stroke="{K}" stroke-width="4"/></svg>'
estrellas = "".join(destello(f"s02-est s02-e{i}", x, y, r) for i, (x, y, r) in enumerate([(600, 880, 26), (980, 960, 22), (960, 1240, 30), (580, 1200, 20)]))
body = f"""
        <div class="fig s02-pas">{pasajera('s02p')}</div>
        <div class="big l s02-existe">¡EXISTE!</div>
        <div class="s02-cartel"><small>LO DE</small>DOÑA NÉLIDA</div>
        <div class="obj s02-torta">{torta('s02t')}</div>
        <div class="mono s02-cumple">¡HOY ES EL CUMPLE!</div>
        <div class="obj s02-corona">{corona}</div>
        <div class="sello s02-mejor">LA MEJOR</div>
        <svg class="full" viewBox="0 0 1080 1920">{estrellas}</svg>
"""
js = """
      const EXISTE = 0.37, DONA = 1.30, CUMPLE = 2.59, HIJA = 3.33, MEJOR = 4.63, TORTA = 4.82;
      const pas = q(".s02-pas");
      entra(pas, 0, { x: -300 }, 0.3);
      habla(".s02p-boca", 0.05, 5.4, "250 386");
      traqueteo(pas, 0.4, 5.3);
      // "¡claro que existe!": sacude la cabeza, cejas enojadas
      tl.fromTo(q(".s02p-cabeza"), { rotation: -6, svgOrigin: "250 420" }, { rotation: 6, svgOrigin: "250 420", duration: 0.1, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, EXISTE - 0.1);
      tl.to(q(".s02p-ceja"), { y: 8, duration: 0.1 }, EXISTE - 0.1);
      sacudon(EXISTE, 0.8);
      golpe(q(".s02-existe"), EXISTE + 0.05, -4, 2.6);
      tl.to(q(".s02-existe"), { opacity: 0, scale: 0.8, duration: 0.15 }, DONA - 0.1);
      // el cartel
      golpe(q(".s02-cartel"), DONA + 0.05, -3, 2.2);
      tl.to(q(".s02-cartel"), { y: -6, rotation: -1, duration: 0.5, yoyo: true, repeat: 7, ease: "sine.inOut" }, DONA + 0.3);
      // la torta del cumple
      pop(q(".s02-torta"), CUMPLE - 0.05, 0.4);
      tl.fromTo(qa(".s02t-llama"), { scaleY: 0.8, transformOrigin: "50% 100%" }, { scaleY: 1.2, duration: 0.12, yoyo: true, repeat: 25, ease: "sine.inOut", immediateRender: false }, CUMPLE + 0.3);
      pop(q(".s02-cumple"), HIJA, 0.3);
      // la mejor
      gsap.set(q(".s02-corona"), { opacity: 0 });
      tl.fromTo(q(".s02-corona"), { opacity: 0, y: -220 }, { opacity: 1, y: 0, duration: 0.3, ease: "bounce.out", immediateRender: false }, MEJOR - 0.1);
      golpe(q(".s02-mejor"), TORTA + 0.1, 8, 2.6);
      sacudon(TORTA + 0.12, 1);
      brilla(qa(".s02-est"), MEJOR);
"""
sfx = [{"t": 0.3, "sfx": "whoosh-short", "vol": 0.25}, {"t": 1.25, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.6}, {"t": 2.55, "sfx": "pop", "vol": 0.3},
       {"t": 3.3, "sfx": "click-soft", "vol": 0.25}, {"t": 4.55, "sfx": "sparkle", "vol": 0.3, "max": 0.9}, {"t": 4.85, "sfx": "impact-bass-2", "vol": 0.35, "max": 0.6}]
escena("s02-pasajera", p, 5.94, css, body, js, sfx)
