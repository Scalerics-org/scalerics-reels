# Snippets SVG de los personajes (coordenadas locales: (0,0) = centro de la cabeza). Paleta:
# crema #fbefe9, rosa #e3a6ae, rosa hondo #c4607a, lila #a48cc8, dorado #c99a3c, ciruela #4b2537, verde sillón #6f9a6a
L = 'stroke="#4b2537" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"'
def aldo(p):  # p = prefijo de clases
    return f'''<g class="{p}-aldo">
  <path class="{p}-cuerpo" d="M-175 420 L-175 250 Q-170 150 -60 128 L60 128 Q170 150 175 250 L175 420 Z" fill="#a48cc8" {L} />
  <path d="M-60 128 L-20 300 M60 128 L20 300" fill="none" {L} />
  <circle cx="0" cy="250" r="7" fill="#4b2537" /><circle cx="0" cy="300" r="7" fill="#4b2537" />
  <path d="M-46 130 L0 205 L46 130 Z" fill="#fbefe9" {L} />
  <path d="M-30 150 L0 168 L30 150 L30 184 L0 168 L-30 184 Z" fill="#c99a3c" {L} />
  <rect x="-32" y="76" width="64" height="62" fill="#fbefe9" {L} />
  <ellipse cx="-92" cy="12" rx="16" ry="26" fill="#fbefe9" {L} />
  <ellipse cx="92" cy="12" rx="16" ry="26" fill="#fbefe9" {L} />
  <ellipse cx="0" cy="0" rx="92" ry="104" fill="#fbefe9" {L} />
  <path d="M-92 -4 Q-122 -34 -96 -66 Q-84 -46 -78 -30 Q-74 -50 -64 -60 Q-62 -30 -70 -6 Z" fill="#fbefe9" {L} />
  <path d="M92 -4 Q122 -34 96 -66 Q84 -46 78 -30 Q74 -50 64 -60 Q62 -30 70 -6 Z" fill="#fbefe9" {L} />
  <path d="M-30 -84 Q0 -96 30 -84" fill="none" stroke="#e3a6ae" stroke-width="6" stroke-linecap="round" />
  <path class="{p}-cejas" d="M-62 -40 Q-40 -54 -16 -44 M16 -44 Q40 -54 62 -40" fill="none" stroke="#4b2537" stroke-width="9" stroke-linecap="round" />
  <circle cx="-38" cy="-6" r="27" fill="#fbefe9" {L} /><circle cx="38" cy="-6" r="27" fill="#fbefe9" {L} />
  <path d="M-11 -8 Q0 -16 11 -8 M-65 -10 L-88 -16 M65 -10 L88 -16" fill="none" {L} />
  <circle class="{p}-ojo" cx="-38" cy="-4" r="7" fill="#4b2537" /><circle class="{p}-ojo" cx="38" cy="-4" r="7" fill="#4b2537" />
  <path d="M0 4 Q16 34 2 42 Q-10 42 -12 34" fill="#fbefe9" {L} />
  <path d="M-60 60 Q-30 38 0 52 Q30 38 60 60 Q34 76 0 64 Q-34 76 -60 60 Z" fill="#4b2537" />
  <path class="{p}-boca" d="M-22 90 Q0 78 22 90" fill="none" {L} />
  <path class="{p}-lagrima" d="M-50 24 Q-40 40 -40 48 A10 10 0 0 1 -60 48 Q-60 40 -50 24 Z" fill="#a48cc8" stroke="#4b2537" stroke-width="3" />
</g>'''
def sillon(p, color="#e3a6ae", w=250):
    return f'''<g class="{p}-sillon">
  <path d="M-{w} 0 Q-{w} -140 -{w-110} -150 L{w-110} -150 Q{w} -140 {w} 0 L{w} 300 L-{w} 300 Z" fill="{color}" {L} />
  <circle cx="-{w//2}" cy="-70" r="7" fill="#4b2537" /><circle cx="0" cy="-90" r="7" fill="#4b2537" /><circle cx="{w//2}" cy="-70" r="7" fill="#4b2537" />
  <rect x="-{w+40}" y="80" width="90" height="260" rx="40" fill="{color}" {L} />
  <rect x="{w-50}" y="80" width="90" height="260" rx="40" fill="{color}" {L} />
</g>'''
def sillon_verde(p, s=1.0):  # el sillón verde, chico, como ícono (origen: centro del asiento)
    return f'''<g class="{p}-verde" transform="scale({s})">
  <path d="M-110 -10 Q-110 -110 -50 -116 L50 -116 Q110 -110 110 -10 Z" fill="#6f9a6a" {L} />
  <rect x="-120" y="-20" width="240" height="70" rx="22" fill="#6f9a6a" {L} />
  <rect x="-150" y="-60" width="52" height="120" rx="24" fill="#6f9a6a" {L} />
  <rect x="98" y="-60" width="52" height="120" rx="24" fill="#6f9a6a" {L} />
  <path d="M-110 60 L-118 92 M110 60 L118 92" fill="none" {L} />
</g>'''
def conductora(p):
    return f'''<g class="{p}-cond">
  <path d="M-150 420 L-150 250 Q-140 150 -50 128 L50 128 Q140 150 150 250 L150 420 Z" fill="#e3a6ae" {L} />
  <path d="M-50 128 Q0 200 50 128" fill="#fbefe9" {L} />
  <path d="M-46 150 Q0 196 46 150" fill="none" stroke="#fbefe9" stroke-width="10" stroke-dasharray="1 16" stroke-linecap="round" />
  <rect x="-26" y="70" width="52" height="66" fill="#fbefe9" {L} />
  <path d="M-128 60 Q-150 -40 -110 -110 Q-50 -178 30 -166 Q118 -154 134 -66 Q150 10 126 70 Q110 40 96 -10 Q60 -64 -40 -50 Q-90 -30 -96 40 Z" fill="#c99a3c" {L} />
  <ellipse cx="0" cy="0" rx="74" ry="90" fill="#fbefe9" {L} />
  <path d="M-74 -20 Q-40 -96 30 -80 Q70 -70 76 -20 Q40 -60 -20 -54 Q-50 -48 -74 -20 Z" fill="#c99a3c" {L} />
  <path d="M-48 -4 Q-34 -14 -18 -4 M18 -4 Q34 -14 48 -4" fill="none" {L} />
  <path d="M-50 -10 L-56 -20 M-42 -14 L-46 -24 M50 -10 L56 -20 M42 -14 L46 -24" fill="none" stroke="#4b2537" stroke-width="4" stroke-linecap="round" />
  <circle cx="-40" cy="22" r="12" fill="#e3a6ae" opacity="0.8" /><circle cx="40" cy="22" r="12" fill="#e3a6ae" opacity="0.8" />
  <path d="M0 4 Q8 22 0 28" fill="none" {L} />
  <path class="{p}-labios" d="M-22 46 Q0 36 22 46 Q0 64 -22 46 Z" fill="#c4607a" {L} />
  <circle cx="-74" cy="30" r="10" fill="#fbefe9" {L} /><circle cx="74" cy="30" r="10" fill="#fbefe9" {L} />
  <g class="{p}-mic">
    <path d="M118 300 L150 160" fill="none" stroke="#4b2537" stroke-width="18" stroke-linecap="round" />
    <circle cx="156" cy="140" r="30" fill="#c99a3c" {L} />
    <path d="M136 130 H176 M136 148 H176 M156 112 V168" fill="none" stroke="#4b2537" stroke-width="3" />
    <ellipse cx="118" cy="310" rx="28" ry="22" fill="#fbefe9" {L} />
  </g>
</g>'''
def graciela(p):
    curls = "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#a48cc8" {L} />' for x,y,r in [(-70,-70,34),(-30,-100,36),(20,-104,36),(64,-78,34),(84,-34,30),(-86,-30,30),(-92,10,24),(92,8,24)])
    return f'''<g class="{p}-gra">
  <path d="M-160 420 L-160 250 Q-150 150 -55 128 L55 128 Q150 150 160 250 L160 420 Z" fill="#c4607a" {L} />
  <path d="M-55 128 L-10 230 M55 128 L10 230" fill="none" {L} />
  <path d="M-44 132 Q0 176 44 132" fill="none" stroke="#fbefe9" stroke-width="12" stroke-dasharray="1 15" stroke-linecap="round" />
  <rect x="-28" y="72" width="56" height="62" fill="#fbefe9" {L} />
  {curls}
  <ellipse cx="0" cy="0" rx="78" ry="92" fill="#fbefe9" {L} />
  <path d="M-70 -40 Q-40 -80 0 -66 Q40 -82 72 -40 Q40 -56 0 -48 Q-40 -58 -70 -40 Z" fill="#a48cc8" {L} />
  <rect x="-62" y="-22" width="48" height="34" rx="12" fill="none" {L} /><rect x="14" y="-22" width="48" height="34" rx="12" fill="none" {L} />
  <path d="M-14 -8 L14 -8" fill="none" {L} />
  <path d="M-62 0 Q-90 60 -60 130 M62 0 Q90 60 60 130" fill="none" stroke="#c99a3c" stroke-width="3" stroke-dasharray="2 6" />
  <circle class="{p}-ojo" cx="-38" cy="-4" r="6" fill="#4b2537" /><circle class="{p}-ojo" cx="38" cy="-4" r="6" fill="#4b2537" />
  <path d="M0 6 Q10 24 0 30" fill="none" {L} />
  <path class="{p}-boca" d="M-24 50 Q0 64 24 50" fill="none" {L} />
  <circle cx="-42" cy="30" r="11" fill="#e3a6ae" opacity="0.8" /><circle cx="42" cy="30" r="11" fill="#e3a6ae" opacity="0.8" />
</g>'''

def cortina_mitad(p, lado, x0, x1, y0=600, y1=1330):  # una mitad de telón con pliegues
    w = x1 - x0
    n = 4
    pl = "".join(f'<path d="M{x0 + w*(i+0.5)/n:.0f} {y0+40} Q{x0 + w*(i+0.5)/n + (14 if i%2 else -14):.0f} {(y0+y1)//2} {x0 + w*(i+0.5)/n:.0f} {y1-10}" fill="none" stroke="#4b2537" stroke-width="4" stroke-linecap="round" opacity="0.55" />' for i in range(n))
    return f'''<g class="{p}-cort-{lado}">
  <path d="M{x0} {y0} H{x1} V{y1} Q{x0 + w*0.75:.0f} {y1-24} {x0 + w*0.5:.0f} {y1} Q{x0 + w*0.25:.0f} {y1-24} {x0} {y1} Z" fill="#c4607a" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
  {pl}
</g>'''
def bambalina(p, x0=90, x1=990, y=596):
    flecos = "".join(f'<path d="M{x} {y+60} V{y+82}" stroke="#c99a3c" stroke-width="6" stroke-linecap="round" />' for x in range(x0+20, x1, 28))
    return f'''<g class="{p}-bamb">
  <path d="M{x0} {y} H{x1} V{y+50} Q{x1-75} {y+80} {x1-150} {y+50} Q{x1-225} {y+80} {x1-300} {y+50} Q{x1-375} {y+80} {x1-450} {y+50} Q{x1-525} {y+80} {x1-600} {y+50} Q{x1-675} {y+80} {x1-750} {y+50} Q{x1-825} {y+80} {x0} {y+50} Z" fill="#c4607a" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
  {flecos}
</g>'''
def flores(p):  # florero con flores (origen: base del florero)
    fl = "".join(f'<g transform="translate({x} {y})"><circle r="22" fill="{c}" stroke="#4b2537" stroke-width="4" /><circle r="8" fill="#c99a3c" /></g>' for x, y, c in [(-40, -170, "#e3a6ae"), (0, -200, "#c4607a"), (42, -168, "#a48cc8"), (-18, -130, "#a48cc8"), (24, -132, "#e3a6ae")])
    return f'''<g class="{p}-flores">
  <path d="M-40 -140 Q-20 -60 -10 -60 M0 -180 V-60 M40 -150 Q20 -60 10 -60" fill="none" stroke="#6f9a6a" stroke-width="5" stroke-linecap="round" />
  {fl}
  <path d="M-46 -64 H46 L34 0 H-34 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
</g>'''
def publico(p, y=1250, n=7, x0=110, x1=970):  # fila de cabezas del público, de espaldas
    out = []
    for i in range(n):
        x = x0 + (x1 - x0) * i / (n - 1)
        c = ["#a48cc8", "#e3a6ae", "#c99a3c", "#a48cc8", "#c4607a", "#e3a6ae", "#a48cc8"][i % 7]
        out.append(f'<g class="{p}-pub p{i}" transform="translate({x:.0f} {y})"><path d="M-70 120 Q-70 40 0 34 Q70 40 70 120 Z" fill="{c}" stroke="#4b2537" stroke-width="5" /><circle cx="0" cy="-10" r="46" fill="#4b2537" /></g>')
    return f'<g class="{p}-publico">' + "".join(out) + "</g>"
def telefono(p):  # teléfono de disco (origen: centro)
    agujeros = "".join(f'<circle cx="{38*__import__("math").cos(a*0.6+0.4):.1f}" cy="{38*__import__("math").sin(a*0.6+0.4)+6:.1f}" r="8" fill="#fbefe9" stroke="#4b2537" stroke-width="3" />' for a in range(9))
    return f'''<g class="{p}-tel">
  <path d="M-110 70 Q-100 -30 -60 -36 H60 Q100 -30 110 70 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
  <circle cx="0" cy="6" r="56" fill="#fbefe9" stroke="#4b2537" stroke-width="5" />
  {agujeros}
  <circle cx="0" cy="6" r="16" fill="#c99a3c" stroke="#4b2537" stroke-width="4" />
  <g class="{p}-tubo"><path d="M-120 -60 Q-120 -96 -84 -96 H84 Q120 -96 120 -60 L96 -40 Q80 -60 60 -62 H-60 Q-80 -60 -96 -40 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" /></g>
</g>'''
def caja(p):  # caja registradora antigua (origen: centro de la base)
    teclas = "".join(f'<circle cx="{-90 + 36*(i%6)}" cy="{-120 + 34*(i//6)}" r="11" fill="#fbefe9" stroke="#4b2537" stroke-width="3" />' for i in range(12))
    return f'''<g class="{p}-caja">
  <path d="M-170 0 V-70 H170 V0 Z" fill="#c99a3c" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
  <path d="M-130 -70 L-110 -180 H120 L140 -70 Z" fill="#e3a6ae" stroke="#4b2537" stroke-width="5" stroke-linejoin="round" />
  {teclas}
  <rect x="-60" y="-260" width="140" height="80" rx="8" fill="#fbefe9" stroke="#4b2537" stroke-width="5" />
  <rect x="-110" y="-50" width="220" height="30" rx="6" fill="#fbefe9" stroke="#4b2537" stroke-width="4" />
  <path d="M190 -110 Q220 -120 220 -150" fill="none" stroke="#4b2537" stroke-width="5" stroke-linecap="round" /><circle cx="220" cy="-160" r="14" fill="#c4607a" stroke="#4b2537" stroke-width="4" />
</g>'''

def tienda(p, x, y, nombre, prendida):  # (x, y) = esquina de abajo a la izquierda; 300 de ancho
    vid = "#fbefe9" if prendida else "#d9c3c6"
    luz = '<rect x="{0}" y="{1}" width="110" height="110" fill="#c99a3c" opacity="0.45" />'.format(x+30, y-190) if prendida else ""
    rayas = "".join(f'<path d="M{x+i*50} {y-300} h50 v44 q-25 22 -50 0 Z" fill="{"#e3a6ae" if i%2 else "#fbefe9"}" stroke="#4b2537" stroke-width="4" stroke-linejoin="round" />' for i in range(6))
    return f'''<g class="{p}">
  <rect x="{x}" y="{y-300}" width="300" height="300" fill="#a48cc8" stroke="#4b2537" stroke-width="5" />
  <rect x="{x}" y="{y-380}" width="300" height="80" fill="#fbefe9" stroke="#4b2537" stroke-width="5" />
  <text x="{x+150}" y="{y-328}" text-anchor="middle" font-family="Lexend" font-weight="700" font-size="28" fill="#4b2537">{nombre}</text>
  {rayas}
  <rect x="{x+30}" y="{y-190}" width="110" height="110" fill="{vid}" stroke="#4b2537" stroke-width="5" />{luz}
  <rect x="{x+180}" y="{y-200}" width="90" height="200" fill="#c4607a" stroke="#4b2537" stroke-width="5" />
  <circle cx="{x+256}" cy="{y-100}" r="6" fill="#c99a3c" />
</g>'''
