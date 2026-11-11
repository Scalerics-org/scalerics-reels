# Tramos de 0,25 s con voz (>-32 dB RMS) donde la voz queda a menos de 6 dB del resto, con los efectos que suenan ahí.
# Correr después de partes/medir.py. Uso: python3 partes/medir-fino.py
import re, subprocess
def rms(f, n=12000):
    o = subprocess.run(["ffmpeg", "-i", f, "-af", f"asetnsamples={n},astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [float(x) if x != "-inf" else -120 for x in re.findall(r"RMS_level=(-?[\d.]+|-inf)", o)]
a, b = rms("/tmp/claude-0/voz.wav"), rms("/tmp/claude-0/resto.wav")
tags = re.findall(r'src="assets/sfx/([a-z0-9-]+)\.mp3" data-start="([\d.]+)" data-duration="([\d.]+)"', open("index.html").read())
for i, (x, y) in enumerate(zip(a, b)):
    t = i * 0.25
    if x > -32 and x - y < 6:
        print(t, round(x, 1), round(y, 1), round(x - y, 1), [n + "@" + st for n, st, d in tags if float(st) < t + 0.25 and float(st) + float(d) > t])
