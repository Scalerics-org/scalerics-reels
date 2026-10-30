from base import escena
from personajes import *
nota = lambda c, x, y, col: f'<g class="s06-nota {c}"><g transform="translate({x} {y})"><ellipse cx="0" cy="0" rx="22" ry="16" transform="rotate(-20)" fill="{col}" stroke="#4b2537" stroke-width="4" /><path d="M18 -6 V-80 Q40 -66 46 -46" fill="none" stroke="#4b2537" stroke-width="6" stroke-linecap="round" /></g></g>'
css = '''
    SC .s06-snif { left: 640px; top: 700px; font-size: 64px; font-family: "Lexend", sans-serif; font-weight: 900; color: #c4607a; -webkit-text-stroke: 6px #4b2537; paint-order: stroke fill; }
'''
cuerpo = f'''
          <g transform="translate(540 960) scale(0.82)">{sillon("s06")}</g>
          <g class="s06-ald"><g transform="translate(540 860) scale(0.82)">{aldo("s06")}</g></g>
          <g class="s06-pan">
            <path d="M0 -60 L60 0 L0 60 L-60 0 Z" transform="translate(540 960)" fill="#fbefe9" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
            <path d="M0 -44 L44 0 L0 44 L-44 0 Z" transform="translate(540 960)" fill="none" stroke="#e3a6ae" stroke-width="4" stroke-dasharray="3 7" />
          </g>
          {nota("n0", 170, 760, "#c99a3c")}{nota("n1", 900, 700, "#e3a6ae")}{nota("n2", 210, 1000, "#a48cc8")}{nota("n3", 870, 980, "#c99a3c")}
          {publico("s06", 1250)}
          {"".join(f'<g class="s06-pp q{i}"><g transform="translate({x} 1190)"><path d="M0 0 V-60" stroke="#4b2537" stroke-width="5" stroke-linecap="round" /><path d="M0 -60 L44 -70 L36 -20 L0 -16 Z" fill="#fbefe9" stroke="#4b2537" stroke-width="4" stroke-linejoin="round" /></g></g>' for i, x in enumerate([180, 470, 760, 900]))}
'''
html = '''
        <div class="lex s06-snif">¡SNIF!</div>
'''
js = '''
      const MUSICA = 0.0, FAVOR = 0.74, PANUELO = 1.56, PARA = 2.05, ALDO = 2.82;
      tl.fromTo(q(".escenario"), { scale: 1.08, transformOrigin: "540px 900px" }, { scale: 1, duration: DUR, ease: "none" }, 0);
      // las notas suben meciéndose
      qa(".s06-nota").forEach((n, i) => {
        tl.fromTo(n, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", immediateRender: false }, 0.05 + i * 0.25);
        tl.to(n, { y: -140, rotation: i % 2 ? 12 : -12, duration: 2.6, ease: "sine.inOut" }, 0.45 + i * 0.25);
      });
      // el público se balancea con la música
      qa(".s06-pub").forEach((p, i) => tl.to(p, { rotation: i % 2 ? 4 : -4, svgOrigin: (110 + i * 143) + " 1370", duration: 0.5, yoyo: true, repeat: 5, ease: "sine.inOut" }, 0.2 + i * 0.05));
      // "pañuelo": vuela desde el costado y Don Aldo lo agarra
      gsap.set(q(".s06-pan"), { opacity: 0 });
      tl.fromTo(q(".s06-pan"), { opacity: 1, x: -520, y: -200, rotation: -200, svgOrigin: "540 960" }, { opacity: 1, x: 0, y: 0, rotation: 0, svgOrigin: "540 960", duration: 0.5, ease: "power2.out", immediateRender: false }, PANUELO - 0.1);
      tl.to(q(".s06-pan"), { y: -60, scale: 1.1, svgOrigin: "540 960", duration: 0.25, ease: "power2.inOut" }, PARA + 0.2);
      // los pañuelitos del público
      qa(".s06-pp").forEach((p, i) => {
        gsap.set(p, { opacity: 0 });
        tl.fromTo(p, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25, ease: "back.out(2)", immediateRender: false }, PANUELO + 0.2 + i * 0.1);
        tl.to(p, { rotation: i % 2 ? 14 : -14, svgOrigin: [180, 470, 760, 900][i] + " 1190", duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" }, PANUELO + 0.45 + i * 0.1);
      });
      // "Aldo": se suena la nariz
      const snif = q(".s06-snif");
      gsap.set(snif, { opacity: 0 });
      tl.fromTo(snif, { opacity: 0, scale: 0.4, rotation: -10 }, { opacity: 1, scale: 1, rotation: 6, duration: 0.2, ease: "back.out(3)", immediateRender: false }, ALDO - 0.1);
      temblor(q(".s06-ald"), ALDO, 0.6);
'''
sfx = [{"t": 0.0, "sfx": "sparkle", "vol": 0.25}, {"t": 1.45, "sfx": "whoosh", "vol": 0.25}, {"t": 2.75, "sfx": "pop", "vol": 0.32}]
escena("s06-musica", css, cuerpo, js, sfx, html)
