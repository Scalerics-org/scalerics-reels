# Mide la mezcla aproximada (voz vs. música + SFX) por tramos de 0,5 s a partir de los <audio> de index.html.
# Uso (desde reels/por-que-la-toalla): python3 partes/medir.py
import re, subprocess, math, sys, json
html = open("index.html").read()
tags = re.findall(r'<audio id="([^"]+)" src="([^"]+)" data-start="([\d.]+)" data-duration="([\d.]+)"(?: data-fade-out="([\d.]+)")?[^>]*data-volume="([\d.]+)"', html)
dur = float(re.search(r'data-composition-id="main" data-start="0" data-duration="([\d.]+)"', html).group(1))
def mezcla(sel, out):
    ins, fil = [], []
    for k, (i, src, st, d, fo, v) in enumerate(sel):
        ins += ["-i", src]
        f = f"[{k}:a]atrim=0:{d},asetpts=N/SR/TB,aresample=48000,aformat=channel_layouts=stereo,volume={v}"
        if fo: f += f",afade=t=out:st={max(0,float(d)-float(fo))}:d={fo}"
        f += f",adelay={int(float(st)*1000)}|{int(float(st)*1000)},apad=whole_dur={dur}[a{k}]"
        fil.append(f)
    fil.append("".join(f"[a{k}]" for k in range(len(sel))) + f"amix=inputs={len(sel)}:normalize=0:duration=longest,atrim=0:{dur}[o]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fil), "-map", "[o]", out], check=True)
voz = [t for t in tags if t[0] == "voz"]; resto = [t for t in tags if t[0] != "voz"]
mezcla(voz, "/tmp/claude-0/voz.wav"); mezcla(resto, "/tmp/claude-0/resto.wav"); mezcla(tags, "/tmp/claude-0/todo.wav")
def rms(f):
    o = subprocess.run(["ffmpeg", "-i", f, "-af", "asetnsamples=24000,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level", "-f", "null", "-"], capture_output=True, text=True).stderr
    return [float(x) if x not in ("-inf",) else -120 for x in re.findall(r"RMS_level=(-?[\d.]+|-inf)", o)]
a, b = rms("/tmp/claude-0/voz.wav"), rms("/tmp/claude-0/resto.wav")
malos = [(i * 0.5, round(x - y, 1)) for i, (x, y) in enumerate(zip(a, b)) if x > -40 and x - y < 6]
print("tramos con voz y diferencia < 6 dB:", malos)
print(subprocess.run(["ffmpeg", "-i", "/tmp/claude-0/todo.wav", "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr.splitlines()[-12:])
