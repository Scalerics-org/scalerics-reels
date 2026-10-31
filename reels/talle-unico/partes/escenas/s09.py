from base import *
p = "s09"
css = """
    [data-composition-id="%ID%"] .s09-l1 { left: 60px; top: 760px; width: 460px; height: 520px; }
    [data-composition-id="%ID%"] .s09-l2 { left: 560px; top: 760px; width: 460px; height: 520px; }
    [data-composition-id="%ID%"] .s09-cartel { left: 340px; top: 470px; padding: 14px 34px 10px; border: 6px solid #d8b25c; background: #0e0c10; text-align: center; }
    [data-composition-id="%ID%"] .s09-cartel b { display: block; font-family: "Cormorant", serif; font-weight: 600; font-size: 72px; line-height: 1; color: #f6f1ea; white-space: nowrap; }
    [data-composition-id="%ID%"] .s09-cartel small { display: block; margin-top: 6px; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 48px; color: #d8b25c; white-space: nowrap; }
    [data-composition-id="%ID%"] .s09-dos { top: 1290px; font-size: 130px; }
"""
def local(n, color):
    return f'''<svg viewBox="0 0 460 520" aria-hidden="true"><rect x="30" y="120" width="400" height="380" fill="#2a2530" {S}/>
  <path d="M10 120 L450 120 L430 200 L30 200 Z" fill="{color}" {S}/>
  {"".join(f'<rect x="{40 + i * 64}" y="124" width="32" height="74" fill="{K}" opacity="0.5"/>' for i in range(6))}
  <rect x="60" y="230" width="190" height="220" fill="{color}" opacity="0.25" stroke="{W}" stroke-width="6"/>
  <path d="M100 450 V330 Q130 300 160 330 V450 M190 450 V360 H230 V450" stroke="{W}" stroke-width="5" fill="none" opacity="0.7"/>
  <rect x="285" y="240" width="115" height="250" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="385" cy="370" r="8" fill="{D}"/>
  <rect x="110" y="20" width="240" height="80" rx="8" fill="{K}" stroke="{D}" stroke-width="5"/>
  <text x="230" y="76" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="48" fill="{W}">LOCAL {n}</text></svg>'''
body = f"""
        <div class="obj s09-l1">{local(1, F)}</div>
        <div class="obj s09-l2">{local(2, D)}</div>
        <div class="obj s09-cartel"><b>LA TIENDA</b><small>de Laura</small></div>
        <div class="rev it f s09-dos">dos locales</div>
"""
js = """
      const TIENDA = 0.25, DOS = 0.92, LOC = 1.25;
      pop(q(".s09-cartel"), 0.05, 0.3, { rotation: -2 });
      gsap.set([q(".s09-l1"), q(".s09-l2")], { transformOrigin: "50% 100%" });
      tl.fromTo(q(".s09-l1"), { scale: 0.3, opacity: 0.3, x: 220 }, { scale: 1, opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.5)" }, TIENDA);
      tl.fromTo(q(".s09-l2"), { scale: 0.3, opacity: 0, x: -220 }, { scale: 1, opacity: 1, x: 0, duration: 0.4, ease: "back.out(1.5)", immediateRender: false }, DOS - 0.1);
      gsap.set(q(".s09-l2"), { opacity: 0 });
      golpe(q(".s09-dos"), LOC, -2, 2.3);
      sacudon(LOC + 0.04, 1);
      tl.to(q(".s09-l1"), { rotation: -3, duration: 0.2, yoyo: true, repeat: 3 }, LOC + 0.2);
      tl.to(q(".s09-l2"), { rotation: 3, duration: 0.2, yoyo: true, repeat: 3 }, LOC + 0.2);
"""
sfx = [{"t": 0.05, "sfx": "pop", "vol": 0.3}, {"t": 0.3, "sfx": "whoosh-short", "vol": 0.3}, {"t": 0.85, "sfx": "whoosh-short", "vol": 0.3}, {"t": 1.2, "sfx": "impact-bass-1", "vol": 0.35, "max": 0.5}]
escena("s09-dos-locales", p, 2.25, css, body, js, sfx)
