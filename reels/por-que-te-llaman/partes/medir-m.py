# Voz vs. resto (música + SFX) con sonoridad MOMENTÁNEA (ventana de 0,4 s, como el revisor), cada 0,5 s y cada 0,1 s.
# Correr después de partes/medir.py (usa sus stems en /tmp/claude-0/ptl-*.wav).
import subprocess, re
def M(f):
    o = subprocess.run(["ffmpeg", "-nostats", "-i", f, "-af", "ebur128=metadata=1,ametadata=print:key=lavfi.r128.M", "-f", "null", "-"], capture_output=True, text=True).stderr
    ts = re.findall(r"pts_time:([\d.]+)", o); ms = re.findall(r"lavfi.r128.M=(-?[\d.]+|-inf)", o)
    return {round(float(t), 1): (float(m) if m != "-inf" else -120) for t, m in zip(ts, ms)}
v, r = M("/tmp/claude-0/ptl-voz.wav"), M("/tmp/claude-0/ptl-resto.wav")
malos5 = [(k, round(v[k] - r.get(k, -120), 1)) for k in sorted(v) if round(k * 10) % 5 == 0 and v[k] > -45 and v[k] - r.get(k, -120) < 6]
malos1 = [(k, round(v[k] - r.get(k, -120), 1)) for k in sorted(v) if v[k] > -30 and v[k] - r.get(k, -120) < 6]
print("momentánea cada 0,5 s, voz > -45 y < 6 LU:", malos5)
print("momentánea cada 0,1 s, voz > -30 y < 6 LU:", malos1)
