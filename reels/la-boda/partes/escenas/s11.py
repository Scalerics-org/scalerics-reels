from base import *
p = "s11"
css = """
    [data-composition-id="%ID%"] .s11-cel { left: 350px; top: 700px; box-shadow: 0 0 0 6px #e3b448, 0 0 90px 30px rgba(227, 180, 72, 0.35); }
    [data-composition-id="%ID%"] .s11-cel .head { background: #5b8ee0; }
    [data-composition-id="%ID%"] .s11-sello { top: 570px; font-size: 76px; color: #e3b448; }
    [data-composition-id="%ID%"] .s11-hora { position: absolute; left: 40px; top: 760px; padding: 12px 22px 6px; background: #2a1220; border: 6px solid #eba5b3; border-radius: 18px; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 54px; color: #eba5b3; transform: rotate(-6deg); }
    [data-composition-id="%ID%"] .s11-nd { left: 20px; top: 870px; width: 340px; text-align: left; font-size: 74px; }
    [data-composition-id="%ID%"] .s11-st { top: 1380px; font-size: 92px; }
    [data-composition-id="%ID%"] .s11-cajas { left: 862px; top: 900px; width: 210px; height: 294px; }
"""
cajas = "".join(f'<g class="s11-caja"><rect x="20" y="{20 + j * 100}" width="260" height="80" rx="8" fill="{[V, R, D, A][j]}" {S}/><text x="60" y="{72 + j * 100}" font-family="Lexend" font-weight="900" font-size="34" fill="{K}">{[38, 39, 40, 41][j]}</text><path class="s11-tic" d="M200 {60 + j * 100} L220 {80 + j * 100} L256 {38 + j * 100}" stroke="{M}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>' for j in range(4))
body = f"""
        <div class="cel s11-cel" style="width:500px;height:780px"><div class="barra"></div><div class="pant"><div class="head"><i></i><b>El de enfrente</b><small>en línea · siempre</small></div>
          <div class="msg el s11-m1" style="top:170px">¿Abren mañana?<small>03:12</small></div>
          <div class="msg yo s11-m2" style="top:290px">¡Sí! De 9 a 19<small>03:12</small></div>
          <div class="msg el s11-m3" style="top:410px">¿Quedan en 40?<small>03:13</small></div>
          <div class="msg yo s11-m4" style="top:530px">Quedan 2 pares<small>03:13</small></div>
        </div></div>
        <div class="sello centro s11-sello">Empleado nuevo</div>
        <div class="s11-hora">03:12</div>
        <div class="big r s11-nd">No<br>duerme</div>
        <div class="obj s11-cajas"><svg viewBox="0 0 300 420" aria-hidden="true">{cajas}</svg></div>
        <div class="big d s11-st">Stock de memoria</div>
"""
js = """
      const CONTESTA = 0.21, EMPLEADO = 0.76, DUERME = 2.12, STOCK = 3.12, MEMORIA = 3.57;
      // cuadro 0: el celular encendido en la oscuridad
      tl.fromTo(q(".s11-cel"), { scale: 0.92, y: 30 }, { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 0);
      vaiven(q(".s11-cel"), 0.4, 4.2, { y: -10 }, 0.5);
      pop(q(".s11-m1"), 0.05, 0.25, { transformOrigin: "0% 100%" });
      pop(q(".s11-m2"), CONTESTA + 0.1, 0.25, { transformOrigin: "100% 100%" });
      golpe(q(".s11-sello"), EMPLEADO + 0.1, -4, 2.4);
      sacudon(EMPLEADO + 0.15, 1);
      pop(q(".s11-m3"), 1.5, 0.25, { transformOrigin: "0% 100%" });
      // no duerme: 03:12
      pop(q(".s11-hora"), DUERME - 0.2, 0.3);
      golpe(q(".s11-nd"), DUERME, -6, 2.2);
      pop(q(".s11-m4"), DUERME + 0.4, 0.25, { transformOrigin: "100% 100%" });
      // stock de memoria: las cajas se tildan
      gsap.set(qa(".s11-caja"), { opacity: 0 });
      qa(".s11-caja").forEach((c, i) => tl.fromTo(c, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.2, ease: "back.out(2)", immediateRender: false }, STOCK - 0.3 + i * 0.08));
      qa(".s11-tic").forEach((t, i) => { const L = 90; gsap.set(t, { strokeDasharray: L, strokeDashoffset: L, opacity: 0 }); tl.set(t, { opacity: 1 }, MEMORIA + i * 0.12); tl.to(t, { strokeDashoffset: 0, duration: 0.2, ease: "power2.out" }, MEMORIA + i * 0.12); });
      golpe(q(".s11-st"), STOCK + 0.1, 3, 2.2);
      sacudon(MEMORIA + 0.05, 0.8);
"""
sfx = [{"t": 0.05, "sfx": "notification", "vol": 0.22}, {"t": 0.3, "sfx": "key-press", "vol": 0.25}, {"t": 0.8, "sfx": "impact-bass-1", "vol": 0.32, "max": 0.6},
       {"t": 2.0, "sfx": "pop", "vol": 0.28}, {"t": 3.1, "sfx": "click", "vol": 0.25}, {"t": 3.6, "sfx": "chime", "vol": 0.22, "max": 0.8}]
escena("s11-empleado", p, 4.70, css, body, js, sfx)
