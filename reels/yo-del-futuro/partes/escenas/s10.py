from base import *
p = "s10"
css = """
    [data-composition-id="%ID%"] .s10-torta { left: 250px; top: 900px; width: 500px; height: 520px; }
    [data-composition-id="%ID%"] .s10-hija { left: 30px; top: 1010px; width: 260px; height: 460px; }
    [data-composition-id="%ID%"] .s10-hoy { left: 660px; top: 760px; }
    [data-composition-id="%ID%"] .s10-gui { left: 0; top: 560px; width: 1080px; height: 130px; }
    [data-composition-id="%ID%"] .s10-m { position: absolute; padding: 10px 18px; border-radius: 22px 22px 6px 22px; background: #22e4ff; border: 4px solid #120621; font-family: "Lexend", sans-serif; font-weight: 800; font-size: 32px; color: #120621; white-space: nowrap; }
    [data-composition-id="%ID%"] .s10-m1 { left: 700px; top: 700px; }
    [data-composition-id="%ID%"] .s10-m2 { left: 620px; top: 770px; }
    [data-composition-id="%ID%"] .s10-m3 { left: 760px; top: 640px; }
    [data-composition-id="%ID%"] .s10-celmano { position: absolute; left: 236px; top: 380px; width: 54px; height: 90px; border-radius: 10px; background: #120621; border: 6px solid #22e4ff; box-shadow: 0 0 20px #22e4ff; }
"""
velas = "".join(f'''<rect x="{x}" y="110" width="22" height="80" rx="6" fill="{[M, C, N, W, M][i]}" {S}/>
  <path class="s10-llama" d="M{x + 11} 50 Q{x + 30} 80 {x + 11} 100 Q{x - 8} 80 {x + 11} 50 Z" fill="{N}" stroke="{K}" stroke-width="4"/>
  <path class="s10-humito" d="M{x + 11} 100 Q{x} 70 {x + 14} 50 Q{x + 26} 30 {x + 10} 10" stroke="{W}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0"/>''' for i, x in enumerate([110, 175, 240, 305, 370]))
torta = f'''<svg viewBox="0 0 500 520" aria-hidden="true">
  {velas}
  <rect x="80" y="190" width="340" height="130" rx="18" fill="{W}" {S}/>
  <path d="M80 230 Q120 270 160 230 Q200 270 240 230 Q280 270 320 230 Q360 270 400 230 Q420 240 420 230" fill="none" stroke="{M}" stroke-width="12"/>
  <rect x="30" y="320" width="440" height="150" rx="18" fill="{M}" {S}/>
  <path d="M30 370 H470" stroke="{W}" stroke-width="12" stroke-dasharray="26 18"/>
  <rect x="0" y="466" width="500" height="30" rx="14" fill="{C}" {S}/>
</svg>'''
gui = f'<svg viewBox="0 0 1080 130"><path d="M0 20 Q540 110 1080 20" stroke="{W}" stroke-width="5" fill="none"/>' + "".join(
    f'<path d="M{x - 30} {20 + 90 * (1 - ((x - 540) / 540) ** 2) - 6} L{x + 30} {20 + 90 * (1 - ((x - 540) / 540) ** 2) - 6} L{x} {80 + 90 * (1 - ((x - 540) / 540) ** 2)} Z" fill="{[M, C, N][i % 3]}" stroke="{K}" stroke-width="4"/>'
    for i, x in enumerate(range(60, 1080, 120))) + "</svg>"
body = f"""
        <div class="obj s10-gui">{gui}</div>
        <div class="obj s10-torta">{torta}</div>
        <div class="obj s10-hija">{hija('s10j')}</div>
        <div class="fig s10-hoy">{hoy('s10h')}<div class="s10-celmano"></div></div>
        <div class="s10-m s10-m1">ok</div>
        <div class="s10-m s10-m2">sí, mañana</div>
        <div class="s10-m s10-m3">te paso precio</div>
"""
js = """
      const CUMPLE = 0.86, HIJA = 1.73, CONT = 2.68, WAPP = 2.95, VELITAS = 3.82;
      tl.fromTo(q(".s10-gui"), { y: -140 }, { y: 0, duration: 0.4, ease: "back.out(1.5)" }, 0);
      tl.fromTo(q(".s10-torta"), { y: 300, opacity: 0.5 }, { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }, 0);
      qa(".s10-llama").forEach((l, i) => { const [cx, cy] = [121 + i * 65, 100]; tl.fromTo(l, { scaleY: 1, svgOrigin: cx + " " + cy }, { scaleY: 1.25, svgOrigin: cx + " " + cy, duration: 0.12, yoyo: true, repeat: 27, ease: "sine.inOut" }, i * 0.03); });
      tl.fromTo(q(".s10-torta"), { scale: 1 }, { scale: 1.06, transformOrigin: "50% 100%", duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, CUMPLE);
      // la hija sopla
      entra(q(".s10-hija"), HIJA - 0.3, { x: -400 }, 0.35);
      tl.fromTo(q(".s10j-boca"), { scale: 1, svgOrigin: "130 192" }, { scale: 1.5, svgOrigin: "130 192", duration: 0.16, yoyo: true, repeat: 9, ease: "sine.inOut", immediateRender: false }, HIJA + 0.1);
      // el de hoy, de espaldas a la torta, contestando WhatsApp
      gsap.set(q(".s10-hoy"), { scale: 0.95, transformOrigin: "50% 100%" });
      entra(q(".s10-hoy"), CONT - 0.35, { x: 500 }, 0.3);
      gsap.set(q(".s10h-bi"), { rotation: -15, svgOrigin: "150 292" });
      gsap.set(q(".s10h-cabeza"), { rotation: -6, svgOrigin: "200 250" });
      [".s10-m1", ".s10-m2", ".s10-m3"].forEach((s, i) => { pop(q(s), WAPP + i * 0.2, 0.22, { rotation: i % 2 ? 4 : -4 }); });
      vaiven(q(".s10-celmano"), CONT, 2, { y: -6 }, 0.15);
      // velitas: se apagan solas
      tl.set(qa(".s10-llama"), { opacity: 0 }, VELITAS);
      tl.fromTo(qa(".s10-humito"), { opacity: 0, y: 0 }, { opacity: 0.8, y: -30, duration: 0.6, stagger: 0.04, ease: "power1.out", immediateRender: false }, VELITAS);
      sacudon(VELITAS + 0.02, 1.2);
      tl.to(q(".s10-hija"), { rotation: -6, transformOrigin: "50% 100%", duration: 0.2 }, VELITAS + 0.1);
"""
sfx = [{"t": 0.85, "sfx": "sparkle", "vol": 0.25}, {"t": 1.6, "sfx": "whoosh-short", "vol": 0.2}, {"t": 2.95, "sfx": "key-press", "vol": 0.3},
       {"t": 3.15, "sfx": "notification", "vol": 0.25}, {"t": 3.35, "sfx": "notification", "vol": 0.22}, {"t": 3.8, "sfx": "glitch-1", "vol": 0.3, "max": 0.5}]
escena("s10-cumple", p, 4.93, css, body, js, sfx)
