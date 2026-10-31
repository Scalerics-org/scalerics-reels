from base import *
p = "s12"
css = css_tienda("s12t", 470, 880) + """
    [data-composition-id="%ID%"] .s12t-cel { left: 70px; top: 600px; }
    [data-composition-id="%ID%"] .s12-vista { position: absolute; left: 420px; top: 570px; padding: 16px 30px 10px; background: #ffd21f; border: 8px solid #16191d; border-radius: 50px; box-shadow: 8px 8px 0 #16191d; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 50px; line-height: 1; color: #16191d; text-align: center; }
    [data-composition-id="%ID%"] .s12-mp { position: absolute; left: 30px; top: 1340px; width: 640px; padding: 20px 0 14px; white-space: nowrap; background: #fbfaf5; border: 8px solid #16191d; border-radius: 60px; box-shadow: 10px 10px 0 #14c4b8; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 38px; color: #16191d; }
    [data-composition-id="%ID%"] .s12-env { position: absolute; left: 600px; top: 790px; width: 420px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 36px; letter-spacing: 0.14em; color: #fbfaf5; text-align: center; }
    [data-composition-id="%ID%"] .s12-chip { position: absolute; left: 620px; width: 400px; padding: 18px 0 12px; border: 8px solid #16191d; border-radius: 20px; box-shadow: 8px 8px 0 #16191d; text-align: center; font-family: "Lexend", sans-serif; font-weight: 900; font-size: 58px; line-height: 1; color: #16191d; }
    [data-composition-id="%ID%"] .s12-chip svg { width: 70px; height: 44px; vertical-align: -4px; margin-right: 14px; }
"""
cam = f'<svg viewBox="0 0 70 44"><rect x="2" y="4" width="40" height="28" fill="{W}" {S}/><path d="M42 12 H56 L66 22 V32 H42 Z" fill="{W}" {S}/><circle cx="16" cy="36" r="6" fill="{K}"/><circle cx="54" cy="36" r="6" fill="{K}"/></svg>'
body = f"""
        <div class="s12t-cel" style="position:absolute;width:470px;height:880px"><div class="s12t-barra"></div><div class="s12t-pantalla">{tienda('s12t', boton='AGREGAR AL CARRITO')}</div></div>
        <div class="s12-vista">PRECIOS<br>A LA VISTA</div>
        <div class="s12-mp" data-layout-allow-overlap>PAGAR CON MERCADO PAGO</div>
        <div class="s12-env">ENVÍOS POR</div>
        <div class="s12-chip s12-c1" style="top:860px; background:#ff7a1a">{cam}DAC</div>
        <div class="s12-chip s12-c2" style="top:1000px; background:#ffd21f">{cam}CORREO</div>
        <div class="s12-chip s12-c3" style="top:1140px; background:#14c4b8">{cam}PEDIDOSYA</div>
"""
js = """
      const VISTA = 0.45, MERCADO = 0.96, ENVIOS = 1.70, DAC = 2.29, CORREO = 2.77, PYA = 3.37;
      gsap.set(q(".s12t-cel"), { opacity: 1 });
      tl.fromTo(q(".s12t-cel"), { y: 120, scale: 0.92 }, { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" }, 0);
      // precios a la vista
      tl.fromTo(qa(".s12t-precio"), { scale: 1 }, { scale: 1.35, color: "#ff7a1a", duration: 0.15, yoyo: true, repeat: 1, stagger: 0.08, ease: "power2.out", immediateRender: false }, VISTA);
      golpe(q(".s12-vista"), VISTA + 0.05, 8, 2.4);
      tl.to(q(".s12-vista"), { rotation: 4, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, VISTA + 0.3);
      // Mercado Pago
      golpe(q(".s12-mp"), MERCADO + 0.05, -2, 1.8);
      sacudon(MERCADO + 0.1, 0.8);
      tl.to(q(".s12-mp"), { scale: 1.04, duration: 0.2, yoyo: true, repeat: 5, ease: "sine.inOut" }, MERCADO + 0.35);
      // envíos
      pop(q(".s12-env"), ENVIOS, 0.25);
      [[".s12-c1", DAC], [".s12-c2", CORREO], [".s12-c3", PYA]].forEach(([s, t], i) => {
        gsap.set(q(s), { opacity: 0 });
        tl.fromTo(q(s), { opacity: 1, x: 600, rotation: 8 }, { opacity: 1, x: 0, rotation: i % 2 ? 2 : -2, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, t - 0.12);
        sacudon(t + 0.15, 0.5);
      });
"""
sfx = [{"t": 0.45, "sfx": "pop", "vol": 0.3}, {"t": 0.96, "sfx": "chime", "vol": 0.25}, {"t": 2.2, "sfx": "whoosh-short", "vol": 0.3},
       {"t": 2.68, "sfx": "whoosh-short", "vol": 0.3}, {"t": 3.28, "sfx": "whoosh-short", "vol": 0.3}, {"t": 3.4, "sfx": "click", "vol": 0.25}]
escena("s12-tienda", p, 4.49, css, body, js, sfx)
