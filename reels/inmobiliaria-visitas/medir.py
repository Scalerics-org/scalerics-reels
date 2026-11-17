# medir.py: momentánea (LUFS, ventana 400 ms) de stem-voz y stem-resto por tramos de 0,5 s, con la ganancia final aplicada
import subprocess, re, sys
g = float(open("assets/audio/ganancia.txt").read()) + 6  # el bus pasa por +6 dB antes del limitador
def mom(f):
    out = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f, "-af", f"volume={g}dB,ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [(float(a), float(b)) for a, b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)", out)]
V, R = mom("assets/audio/stem-voz.wav"), mom("assets/audio/stem-resto.wav")
def tramo(L, a): xs = [m for t, m in L if a <= t < a + 0.5]; return max(xs) if xs else -99
peor = 99; malos = []
t = 0.0
while t < V[-1][0]:
    v, r = tramo(V, t), tramo(R, t)
    if v > -40:
        d = v - r; peor = min(peor, d)
        if d < 6: malos.append(f"{t:.1f}s voz {v:.1f} resto {r:.1f} ({d:+.1f})")
    t += 0.5
print("mínimo voz-resto en tramos con voz:", round(peor, 1)); print("\n".join(malos))
