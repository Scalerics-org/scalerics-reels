import sys; sys.path.insert(0, 'escenas')
from mk import mk

# tablero grande de las escenas de partida
TAB = "const TB = { cx: 540, yN: 1330, yF: 900, W: 1000, k: 0.75 };\n      const C = (c, r) => AJ.casilla(TB, c, r);"

# ---------- s01 mate: el gancho. El rey blanco (tu local, con delantal) cae; el caballo negro sonríe.
mk("s01-mate", 3.33, """
.s01-sello { left: 120px; top: 610px; font-size: 104px; }
.s01-nota { left: 640px; top: 1400px; }
""", """
        <div class="aj-sello s01-sello">JAQUE MATE</div>
        <div class="aj-nota s01-nota"><b>0-1</b>ni te enteraste</div>
""", TAB + r"""
      const k = C(3, 1), n = C(5, 3), d = C(2, 4), t = C(6, 6), p1 = C(1, 2), p2 = C(4, 5);
      svg.innerHTML = AJ.tablero(TB) +
        AJ.pieza("torre", t.x, t.y, 1.0 * t.p, "n", { cls: "s01-t" }) +
        AJ.pieza("peon", p2.x, p2.y, 1.1 * p2.p, "n") +
        AJ.pieza("dama", d.x, d.y, 1.25 * d.p, "n", { cls: "s01-d" }) +
        `<g class="s01-n">${AJ.pieza("caballo", n.x, n.y, 1.45 * n.p, "n", { cara: "canchero" })}</g>` +
        AJ.pieza("peon", p1.x, p1.y, 1.2 * p1.p, "b", { cara: "susto" }) +
        `<g class="s01-k">${AJ.pieza("rey", k.x, k.y, 1.55 * k.p, "b", { cara: "susto", extra: "delantal" })}</g>` +
        `<g class="s01-q"><text data-layout-ignore x="${k.x + 10}" y="${k.y - 150}" font-family="Cinzel" font-weight="900" font-size="120" fill="${AJ.MAR}" stroke="${AJ.INK}" stroke-width="6" paint-order="stroke">?</text></g>`;
      const MATE = 0.41, VOS = 1.07, JUG = 2.29;
      const kb = `${k.x} ${k.y}`;
      // cuadro 0: el rey ya tambalea y la cámara se acerca
      tl.fromTo(q(".s01-escenario"), { scale: 1.1 }, { scale: 1, duration: DUR, ease: "power1.out", transformOrigin: "50% 62%" }, 0);
      K.origen(q(".s01-k"), kb);
      tl.fromTo(q(".s01-k"), { rotation: -6 }, { rotation: 8, svgOrigin: kb, duration: 0.2, yoyo: true, repeat: 1, ease: "sine.inOut", immediateRender: false }, 0);
      K.sello(q(".s01-sello"), MATE, -4);
      K.sacudon(q(".s01-escenario"), MATE + 0.02, 1.2);
      K.tumbar(q(".s01-k"), MATE + 0.1, kb, -82);
      // el caballo festeja con un saltito
      K.saltar(q(".s01-n"), MATE + 0.25, 0, 0, 0.35, 40);
      K.popSvg(q(".s01-q"), VOS + 0.2, `${k.x + 45} ${k.y - 190}`, 0.35, 0.2);
      tl.to(q(".s01-sello"), { y: -10, duration: DUR - MATE - 0.3, ease: "none" }, MATE + 0.3);
      K.pop(q(".s01-nota"), JUG);
""", [{"t": 0.0, "sfx": "drama", "vol": 0.3, "max": 1.5}, {"t": 0.41, "sfx": "golpe", "vol": 0.45}, {"t": 0.55, "sfx": "ficha", "vol": 0.5}, {"t": 1.2, "sfx": "pop", "vol": 0.25}, {"t": 2.29, "sfx": "tic", "vol": 0.4}])
