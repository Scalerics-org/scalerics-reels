# medir-sfx.py <mp4> <stem-voz.wav>: máxima momentánea (LUFS, 400 ms) del MP4 final en los tramos de 0,5 s SIN voz
# (stem de voz por debajo de -45); avisa si algún efecto pasa -31
import subprocess, re, sys
def mom(f, extra=""):
    out = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", f, "-af", extra + "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [(float(a), float(b)) for a, b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)", out)]
F, V = mom(sys.argv[1]), mom(sys.argv[2])
def tramo(L, a): xs = [m for t, m in L if a <= t < a + 0.5]; return max(xs) if xs else -99
t, peor = 0.0, -99
while t < F[-1][0]:
    if tramo(V, t) < -45:
        f = tramo(F, t); peor = max(peor, f)
        print(f"{t:5.1f}s  {f:6.1f}" + ("   <-- pasa -31" if f > -31 else ""))
    t += 0.5
print("máximo sin voz:", peor)
