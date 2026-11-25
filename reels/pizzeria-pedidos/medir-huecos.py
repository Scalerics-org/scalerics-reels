# medir-huecos.py: con la ganancia de paso10 (loudnorm lineal a -14) aplicada a la mezcla, momentánea máxima por tramo de
# 0,5 s: con voz (stem-voz > -45) y sin voz. Meta (r2): sin voz ~-28 a -31; voz ≥ 6 LU sobre el resto (medir.py).
import subprocess, re
def I(f):
    o = subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS",o)[-1])
g = -14 - I("assets/audio/mezcla.wav")
def mom(f, extra=""):
    o = subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af",extra+"ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return [(float(a), float(b)) for a,b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)",o)]
F = mom("assets/audio/mezcla.wav", f"volume={g}dB,")
gv = float(open("assets/audio/ganancia.txt").read()) + 6 + g
V = mom("assets/audio/stem-voz.wav", f"volume={gv}dB,")
def tr(L,a): xs=[m for t,m in L if a<=t<a+0.5]; return max(xs) if xs else -99
t=0.0; malos=[]
while t < F[-1][0]:
    if tr(V,t) < -45:
        f = tr(F,t)
        if f < -33 or f > -27: malos.append(f"{t:5.1f} {f:6.1f}")
    t += 0.5
print("tramos sin voz fuera de -33..-27:", " · ".join(malos) or "ninguno")
