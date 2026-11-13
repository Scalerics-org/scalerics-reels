import sys, json
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.recordingPen import DecomposingRecordingPen
from fontTools.pens.boundsPen import BoundsPen
src, out, chars = sys.argv[1], sys.argv[2], sys.argv[3]
f = TTFont(src)
f = instantiateVariableFont(f, {"wght": 800})
upm = f['head'].unitsPerEm; k = 1000/upm
gs = f.getGlyphSet(); cmap = f.getBestCmap()
glyphs = {}
for ch in chars:
    gn = cmap[ord(ch)]; g = gs[gn]
    rp = DecomposingRecordingPen(gs); g.draw(rp)
    bp = BoundsPen(gs); g.draw(bp)
    o = []
    for op, pts in rp.value:
        P = [(round(x*k,2), round(y*k,2)) for x, y in pts]
        if op == 'moveTo': o.append('m %s %s' % P[0])
        elif op == 'lineTo': o.append('l %s %s' % P[0])
        elif op == 'qCurveTo':
            # split implied on-curve points
            ctrl = P[:-1]; end = P[-1]
            for i, c in enumerate(ctrl):
                if i < len(ctrl)-1:
                    n = ctrl[i+1]; mid = ((c[0]+n[0])/2, (c[1]+n[1])/2)
                    o.append('q %s %s %s %s' % (mid[0], mid[1], c[0], c[1]))
                else:
                    o.append('q %s %s %s %s' % (end[0], end[1], c[0], c[1]))
        elif op == 'curveTo':
            o.append('b %s %s %s %s %s %s' % (P[2][0], P[2][1], P[0][0], P[0][1], P[1][0], P[1][1]))
        elif op in ('closePath', 'endPath'): pass
    b = bp.bounds or (0,0,0,0)
    glyphs[ch] = {"ha": round(g.width*k), "x_min": b[0]*k, "x_max": b[2]*k, "o": ' '.join(o)}
meta = {"familyName":"Lexend","ascender":1000,"descender":-250,"underlinePosition":-100,"underlineThickness":50,"boundingBox":{"yMin":-300,"xMin":0,"yMax":1000,"xMax":1500},"resolution":1000,"original_font_information":{"format":0,"fontFamily":"Lexend"}}
meta["glyphs"] = glyphs
open(out,'w').write("export default " + json.dumps(meta) + ";\n")
print(len(glyphs), "glifos")
