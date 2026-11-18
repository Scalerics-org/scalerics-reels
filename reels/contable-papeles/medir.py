# medir.py: momentánea (LUFS, ventana 400 ms) de stem-voz y stem-resto, con la ganancia final aplicada.
# Por tramo de 0,5 s: el cuadro donde la voz es más fuerte, y el resto EN ESE MISMO cuadro (ventanas pareadas). (r1)
# También informa el viejo criterio (máximos del tramo) como referencia.
import subprocess, re
g = float(open("assets/audio/ganancia.txt").read()) + 6  # el bus pasa por +6 dB antes del limitador
def mom(f):
    out = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f, "-af", f"volume={g}dB,ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [(float(a), float(b)) for a, b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)", out)]
V, R = mom("assets/audio/stem-voz.wav"), mom("assets/audio/stem-resto.wav")
Rd = dict((round(t, 1), m) for t, m in R)
peor = 99; malos = []; peor2 = 99
t = 0.0
while t < V[-1][0]:
    xs = [(m, tt) for tt, m in V if t <= tt < t + 0.5]
    if xs:
        v, tv = max(xs)
        if v > -40:
            r = Rd.get(round(tv, 1), -99); d = v - r; peor = min(peor, d)
            if d < 6: malos.append(f"{t:.1f}s voz {v:.1f} resto {r:.1f} ({d:+.1f})")
            r2 = max([m for tt, m in R if t <= tt < t + 0.5] or [-99]); peor2 = min(peor2, v - r2)
    t += 0.5
print("mínimo voz-resto (ventanas pareadas) en tramos con voz:", round(peor, 1), "· criterio viejo (máximos del tramo):", round(peor2, 1)); print("\n".join(malos))
