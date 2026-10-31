from base import *
from base import _pierna
p = "s03"
css = """
    [data-composition-id="%ID%"] .s03-tapa { left: 250px; top: 560px; width: 580px; height: 860px; border: 8px solid #d8b25c; background: #1d1920; overflow: hidden; box-shadow: 14px 14px 0 #ff2e88; }
    [data-composition-id="%ID%"] .s03-tapa .s03-mast { position: absolute; left: 0; right: 0; top: 14px; text-align: center; font-family: "Cormorant", serif; font-weight: 600; font-size: 120px; line-height: 1; color: #f6f1ea; letter-spacing: 0.04em; }
    [data-composition-id="%ID%"] .s03-tapa .s03-mast i { font-style: italic; font-weight: 500; color: #ff2e88; }
    [data-composition-id="%ID%"] .s03-tapa .fig { left: 90px; top: 150px; }
    [data-composition-id="%ID%"] .s03-nombre { left: 0; right: 0; bottom: 30px; text-align: center; font-family: "Cormorant", serif; font-style: italic; font-weight: 500; font-size: 64px; color: #f6f1ea; background: #0e0c10; padding: 6px 0; position: absolute; border-top: 4px solid #d8b25c; }
    [data-composition-id="%ID%"] .s03-tit { left: 250px; top: 1440px; color: #d8b25c; font-size: 30px; }
    [data-composition-id="%ID%"] .s03-dia { left: 20px; top: 860px; width: 330px; height: 560px; }
    [data-composition-id="%ID%"] .s03-diat { left: 60px; top: 800px; font-size: 30px; color: #ff2e88; }
"""
diablo = f'''<svg viewBox="0 0 330 560" aria-hidden="true"><g class="s03-dcuerpo">
  <path class="s03-cola" d="M200 420 Q300 440 290 340 L310 320 L280 318 L284 340 Q290 410 210 400" fill="none" stroke="{K}" stroke-width="10" stroke-linejoin="round"/>
  {_pierna(F, 150, 146, 400, 520, 22)}{_pierna(F, 180, 184, 400, 520, 22)}
  <path d="M120 530 L160 530 L160 516 L136 512 Z M170 530 L210 530 L194 512 L170 516 Z" fill="{K}" stroke="{D}" stroke-width="3"/>
  <path d="M118 250 Q165 236 212 250 L222 340 Q250 420 256 440 Q165 456 74 440 Q80 420 108 340 Z" fill="{K}" stroke="{D}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M120 260 L84 330 L100 400" stroke="{K}" stroke-width="30" fill="none" stroke-linecap="round"/><path d="M120 260 L84 330 L100 400" stroke="{F}" stroke-width="20" fill="none" stroke-linecap="round"/>
  <g class="s03-pa"><path d="M210 260 L240 320 L196 330" stroke="{K}" stroke-width="30" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M210 260 L240 320 L196 330" stroke="{F}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M180 320 L230 300 L222 340 Z" fill="{W}" {S}/></g>
  <ellipse cx="165" cy="170" rx="66" ry="70" fill="{F}" {S}/>
  <path d="M112 128 Q92 80 104 60 Q120 100 136 112 Z M218 128 Q238 80 226 60 Q210 100 194 112 Z" fill="{K}" stroke="{D}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M130 166 Q144 156 158 166 M172 166 Q186 156 200 166" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M140 210 Q165 192 190 210" stroke="{K}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g class="s03-lag"><path d="M138 176 Q124 210 132 236" stroke="{W}" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M192 176 Q206 210 198 236" stroke="{W}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <circle class="s03-gota" cx="130" cy="250" r="9" fill="{W}"/><circle class="s03-gota" cx="200" cy="250" r="9" fill="{W}"/></g>
</g></svg>'''
body = f"""
        <div class="obj s03-tapa"><div class="s03-mast">LAM<i>É</i></div><div class="fig">{critica('s03b')}</div><div class="s03-nombre">Bárbara Lamé</div></div>
        <div class="mono s03-tit">la crítica más temida</div>
        <div class="obj s03-dia">{diablo}</div>
        <div class="mono s03-diat">el diablo</div>
"""
js = """
      const BAR = 0.92, LAME = 1.35, CRIT = 2.10, LLORAR = 2.77, DIABLO = 3.43, MODA = 4.35;
      const tapa = q(".s03-tapa");
      // cuadro 0: la tapa de la revista entra girando
      tl.fromTo(tapa, { rotation: -8, scale: 0.85, opacity: 0.4 }, { rotation: -3, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.6)" }, 0);
      gsap.set(q(".s03-nombre"), { opacity: 0 });
      tl.fromTo(q(".s03-tapa .fig"), { y: 140 }, { y: 0, duration: 0.6, ease: "power3.out" }, 0.1);
      tl.to(q(".s03b-bd"), { rotation: -100, svgOrigin: "250 292", duration: 0.35, ease: "back.out(2)" }, BAR - 0.1);
      tl.to(tapa, { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1 }, BAR);
      pop(q(".s03-nombre"), LAME - 0.1, 0.3);
      pop(q(".s03-tit"), CRIT - 0.1, 0.3);
      tl.to(q(".s03b-gafas"), { y: 26, duration: 0.3 }, CRIT + 0.3);
      // el diablo llorando
      tl.to(tapa, { x: 110, rotation: 2, duration: 0.4, ease: "power3.inOut" }, LLORAR - 0.3);
      tl.to(q(".s03-tit"), { x: 110, duration: 0.4, ease: "power3.inOut" }, LLORAR - 0.3);
      entra(q(".s03-dia"), LLORAR - 0.1, { x: -500 }, 0.35);
      pop(q(".s03-diat"), DIABLO, 0.3);
      tl.to(q(".s03-dcuerpo"), { y: 6, duration: 0.1, yoyo: true, repeat: 15, ease: "sine.inOut" }, DIABLO);
      gsap.set(q(".s03-lag"), { opacity: 0 });
      tl.to(q(".s03-lag"), { opacity: 1, duration: 0.15 }, DIABLO + 0.1);
      qa(".s03-gota").forEach((g, i) => tl.fromTo(g, { y: 0, opacity: 1 }, { y: 160, opacity: 0, duration: 0.5, repeat: 2, ease: "power1.in", immediateRender: false }, DIABLO + 0.2 + i * 0.2));
      tl.to(q(".s03-cola"), { rotation: -14, svgOrigin: "200 420", duration: 0.25, yoyo: true, repeat: 5 }, LLORAR);
      tl.to(q(".s03b-boca"), { scaleX: 1.3, svgOrigin: "200 240", duration: 0.2 }, MODA - 0.3);
"""
sfx = [{"t": 0.05, "sfx": "whoosh", "vol": 0.25, "max": 0.5}, {"t": 0.95, "sfx": "sparkle", "vol": 0.3}, {"t": 1.3, "sfx": "pop", "vol": 0.3},
       {"t": 2.05, "sfx": "click-soft", "vol": 0.3}, {"t": 2.7, "sfx": "whoosh-short", "vol": 0.3}, {"t": 3.5, "sfx": "glitch-1", "vol": 0.18, "max": 0.4}]
escena("s03-barbara", p, 5.17, css, body, js, sfx)
