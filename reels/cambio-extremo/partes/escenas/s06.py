from base import *
p = "s06"
css = """
    [data-composition-id="%ID%"] .s06-cua { left: 90px; top: 560px; width: 900px; height: 560px; }
    [data-composition-id="%ID%"] .s06-chat { left: 70px; top: 1150px; font-size: 46px; border-radius: 30px 30px 30px 6px; }
    [data-composition-id="%ID%"] .s06-chat i { font-style: normal; color: #ff7a1a; }
    [data-composition-id="%ID%"] .s06-comp { position: absolute; left: 700px; top: 1130px; width: 280px; height: 360px; background: #fbfaf5; border: 6px solid #16191d; border-radius: 10px; box-shadow: 8px 8px 0 #16191d; }
    [data-composition-id="%ID%"] .s06-comp b { display: block; margin: 22px 0 0; text-align: center; font-family: "IBM Plex Mono", monospace; font-weight: 600; font-size: 26px; color: #16191d; }
    [data-composition-id="%ID%"] .s06-comp i { display: block; height: 16px; margin: 22px 26px 0; background: #16191d; opacity: 0.25; border-radius: 8px; filter: blur(3px); }
    [data-composition-id="%ID%"] .s06-sello { left: 70px; top: 760px; font-size: 68px; color: #ffd21f; }
"""
garab = lambda d: f'<path d="{d}" stroke="#2c4a66" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
cuaderno = f'''<svg viewBox="0 0 900 560" aria-hidden="true">
  <path d="M450 40 Q250 0 40 40 L40 530 Q250 490 450 530 Q650 490 860 530 L860 40 Q650 0 450 40 Z" fill="{W}" {S}/>
  <path d="M450 40 V530" {S}/>
  {"".join(f'<path d="M70 {110 + i * 46} H430 M470 {110 + i * 46} H830" stroke="{T}" stroke-width="3" opacity="0.5"/>' for i in range(9))}
  <text x="80" y="100" font-family="Lexend" font-weight="700" font-size="34" fill="#2c4a66">PEDIDOS</text>
  <text x="80" y="185" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">Sra. taza roja ??</text>
  <text x="80" y="277" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">2 velas (¿pagó?)</text>
  <text x="80" y="369" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">el del osito: martes</text>
  <text x="490" y="140" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">Marta ¿o Marcia?</text>
  <text x="490" y="232" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">seña: sí, no, ¿sí?</text>
  <text x="490" y="324" font-family="Lexend" font-weight="600" font-size="30" fill="#2c4a66">llamar!!!</text>
  <g class="s06-tach">{garab("M80 270 L410 285")}{garab("M490 130 L770 120")}{garab("M560 400 Q620 360 680 420 Q740 470 800 400")}{garab("M120 440 Q160 400 200 450 Q240 490 280 440")}</g>
  <circle class="s06-mancha" cx="760" cy="470" r="34" fill="{N}" opacity="0.3"/>
</svg>'''
body = f"""
        <div class="obj s06-cua">{cuaderno}</div>
        <div class="s06-comp"><b>COMPROBANTE</b><i></i><i></i><i style="width:120px"></i><i></i><i style="width:90px"></i></div>
        <div class="globo s06-chat">«pasame la seña<br>por <i>transferencia</i>»</div>
        <div class="sello s06-sello">FALLA ESTRUCTURAL</div>
"""
js = """
      const CUA = 0.68, COBRAR = 1.60, PASAME = 2.37, TRANS = 3.08;
      // cuadro 0: el cuaderno entrando
      gsap.set(q(".s06-cua"), { opacity: 1 });
      tl.fromTo(q(".s06-cua"), { y: 300, rotation: 8, scale: 0.8 }, { y: 0, rotation: -2, scale: 1, duration: 0.5, ease: "back.out(1.4)" }, 0);
      tl.fromTo(q(".s06-cua"), { scale: 1 }, { scale: 1.06, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, CUA);
      sacudon(CUA, 1.2);
      qa(".s06-tach path").forEach((p, i) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); tl.to(p, { strokeDashoffset: 0, duration: 0.3, ease: "power2.inOut" }, CUA + 0.1 + i * 0.2); });
      tl.to(q(".s06-cua"), { rotation: 1, duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, CUA + 0.3);
      // la seña por transferencia
      entra(q(".s06-comp"), COBRAR, { x: 500 }, 0.3);
      tl.to(q(".s06-comp"), { rotation: 8, duration: 0.3 }, COBRAR + 0.3);
      pop(q(".s06-chat"), PASAME - 0.05, 0.3);
      tl.to(q(".s06-chat"), { y: -10, duration: 0.25, yoyo: true, repeat: 5, ease: "sine.inOut" }, PASAME + 0.3);
      golpe(q(".s06-sello"), TRANS + 0.05, -10, 2.6);
      sacudon(TRANS + 0.1, 1.6);
"""
sfx = [{"t": 0.05, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 0.68, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.5}, {"t": 0.8, "sfx": "typing", "vol": 0.2, "max": 0.8},
       {"t": 1.6, "sfx": "click", "vol": 0.25}, {"t": 2.35, "sfx": "notification", "vol": 0.25}, {"t": 3.05, "sfx": "impact-bass-2", "vol": 0.42, "max": 0.7}]
escena("s06-cuaderno", p, 4.16, css, body, js, sfx)
