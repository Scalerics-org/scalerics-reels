from base import *
p = "s01"
css = """
    [data-composition-id="%ID%"] .s01-local { left: 200px; top: 600px; width: 680px; height: 740px; }
    [data-composition-id="%ID%"] .s01-bar { left: 640px; top: 640px; }
    [data-composition-id="%ID%"] .s01-des { top: 450px; font-size: 230px; }
    [data-composition-id="%ID%"] .s01-tag { left: 40px; top: 1000px; }
"""
rayas = "".join(f'<rect x="{80 + i * 70}" y="330" width="35" height="80" fill="{W}"/>' for i in range(7))
local = f'''<svg viewBox="0 0 680 740" aria-hidden="true">
  <rect x="100" y="300" width="480" height="420" fill="#2a2530" {S}/>
  <path d="M80 330 L600 330 L620 410 L60 410 Z" fill="{K}" {S}/>{rayas}
  <path d="M80 330 L600 330 L620 410 L60 410 Z" fill="none" {S}/>
  <rect x="130" y="440" width="230" height="230" fill="{F}" opacity="0.25" stroke="{W}" stroke-width="6"/>
  <path d="M160 640 V560 H210 V640 M250 640 V520 H300 V640" stroke="{W}" stroke-width="6" fill="none" opacity="0.7"/>
  <rect x="400" y="450" width="140" height="250" fill="{K}" stroke="{W}" stroke-width="6"/><circle cx="520" cy="580" r="9" fill="{D}"/>
  <rect x="80" y="704" width="520" height="24" fill="{W}" {S}/>
  <g class="s01-buzo">
    <path class="s01-mi" d="M150 210 L20 250 L30 330 L150 300 Z" fill="{G}" {S}/>
    <path class="s01-md" d="M530 210 L660 250 L650 330 L530 300 Z" fill="{G}" {S}/>
    <path d="M140 170 Q340 140 540 170 L560 400 Q340 420 120 400 Z" fill="{G}" {S}/>
    <path d="M124 372 Q340 392 556 372 L560 400 Q340 420 120 400 Z" fill="{G}" {S}/>
    <path d="M140 386 V404 M180 388 V408 M220 390 V410 M260 392 V412 M300 393 V413 M340 394 V414 M380 393 V413 M420 392 V412 M460 390 V410 M500 388 V408 M540 386 V404" stroke="{K}" stroke-width="4"/>
    <path class="s01-tension" d="M190 250 L230 262 M450 262 L490 250 M200 300 L250 306 M430 306 L480 300 M300 230 L330 240 M350 240 L380 230" stroke="{K}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
    <path d="M250 170 Q340 200 430 170" stroke="{K}" stroke-width="6" fill="none"/>
  </g>
  <g class="s01-cartel"><rect x="210" y="40" width="260" height="130" rx="10" fill="{K}" stroke="{W}" stroke-width="6"/>
    <text x="340" y="95" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="44" fill="{W}">TU</text>
    <text x="340" y="148" text-anchor="middle" font-family="Cormorant" font-weight="600" font-size="44" fill="{W}">NEGOCIO</text></g>
  <circle class="s01-boton" cx="340" cy="320" r="14" fill="{D}" {S}/>
</svg>'''
body = f"""
        <div class="obj s01-local">{local}</div>
        {tag('s01-tag', 'Talle único', 'one size', rot=-10)}
        <div class="fig s01-bar">{critica('s01b')}</div>
        <div class="rev it f s01-des">desastre.</div>
"""
js = """
      const PUESTO = 1.02, NEG = 1.70, QUERIDO = 2.85, ESO = 3.62, DES = 4.32;
      const loc = q(".s01-local");
      // cuadro 0: el local ya está, con el buzo puesto
      gsap.set(loc, { scale: 0.94, transformOrigin: "50% 100%" });
      tl.to(loc, { scale: 1, duration: 1.0, ease: "power2.out" }, 0);
      gsap.set(q(".s01-tag"), { transformOrigin: "100% 50%" });
      tl.fromTo(q(".s01-tag"), { rotation: -30 }, { rotation: -8, duration: 0.6, ease: "elastic.out(1, 0.4)" }, 0);
      vaiven(q(".s01-tag"), 0.6, 2.2, { rotation: -14 }, 0.45);
      // el buzo aprieta
      tl.to(q(".s01-buzo"), { scaleX: 0.93, svgOrigin: "340 300", duration: 0.12, yoyo: true, repeat: 5, ease: "sine.inOut" }, PUESTO - 0.1);
      tl.fromTo(q(".s01-tension"), { opacity: 0.2 }, { opacity: 1, duration: 0.1, yoyo: true, repeat: 7 }, PUESTO);
      tl.to(q(".s01-boton"), { x: 260, y: -420, rotation: 540, svgOrigin: "340 320", duration: 0.7, ease: "power2.out" }, PUESTO + 0.3);
      tl.to(q(".s01-boton"), { opacity: 0, duration: 0.2 }, PUESTO + 0.9);
      tl.fromTo(q(".s01-cartel"), { opacity: 1 }, { opacity: 0.3, duration: 0.08, yoyo: true, repeat: 3, ease: "steps(1)" }, NEG);
      // Bárbara entra y baja los lentes
      tl.to(loc, { x: -130, scale: 0.86, duration: 0.4, ease: "power3.inOut" }, QUERIDO - 0.25);
      tl.to(q(".s01-tag"), { x: 30, y: 60, scale: 0.86, duration: 0.4, ease: "power3.inOut" }, QUERIDO - 0.25);
      gsap.set(q(".s01-bar"), { scale: 1.15, transformOrigin: "50% 100%" });
      entra(q(".s01-bar"), QUERIDO - 0.2, { x: 600 }, 0.4);
      habla(".s01b-boca", QUERIDO, 0.5, "200 240");
      tl.to(q(".s01b-gafas"), { y: 26, duration: 0.35, ease: "power2.inOut" }, ESO - 0.4);
      tl.to(q(".s01b-ceja"), { y: -8, duration: 0.25 }, ESO - 0.3);
      tl.to(q(".s01b-bd"), { rotation: -40, svgOrigin: "250 292", duration: 0.3, ease: "back.out(2)" }, ESO);
      habla(".s01b-boca", ESO, 0.9, "200 240");
      // DESASTRE.
      golpe(q(".s01-des"), DES, -5, 3);
      sacudon(DES + 0.04, 1.6);
      tl.to(q(".s01-buzo"), { y: 30, rotation: -6, svgOrigin: "340 300", duration: 0.2, ease: "back.out(3)" }, DES + 0.05);
      tl.to(q(".s01-des"), { scale: 1.05, duration: 0.18, yoyo: true, repeat: 3, ease: "sine.inOut" }, DES + 0.2);
"""
sfx = [{"t": 0.02, "sfx": "impact-bass-1", "vol": 0.3, "max": 0.6}, {"t": 1.0, "sfx": "click", "vol": 0.25},
       {"t": 1.35, "sfx": "pop", "vol": 0.3}, {"t": 2.6, "sfx": "whoosh", "vol": 0.25, "max": 0.5},
       {"t": 3.3, "sfx": "click-soft", "vol": 0.3}, {"t": 4.22, "sfx": "impact-bass-2", "vol": 0.45, "max": 0.8}, {"t": 4.3, "sfx": "sparkle", "vol": 0.25}]
escena("s01-gancho", p, 5.57, css, body, js, sfx)
