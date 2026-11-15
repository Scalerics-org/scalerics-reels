# Voz vs. resto (música + SFX) por tramos de 0,1 s, solo donde la voz suena (RMS > -32 dB). Correr después de medir.py.
import subprocess, re
def rms(f):
    o = subprocess.run(["ffmpeg", "-i", f, "-af", "asetnsamples=4800,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [float(x) if x != "-inf" else -120 for x in re.findall(r"RMS_level=(-?[\d.]+|-inf)", o)]
a, b = rms("/tmp/claude-0/-home-user-scalerics-reels/616c6f17-c3af-5159-a450-0bdf32245319/scratchpad/pcm-voz.wav"), rms("/tmp/claude-0/-home-user-scalerics-reels/616c6f17-c3af-5159-a450-0bdf32245319/scratchpad/pcm-resto.wav")
malos = [(round(i * 0.1, 1), round(x - y, 1)) for i, (x, y) in enumerate(zip(a, b)) if x > -32 and x - y < 6]
print("tramos de 0,1 s con voz y < 6 dB:", malos)
