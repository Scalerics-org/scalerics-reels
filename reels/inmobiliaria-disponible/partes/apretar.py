# apretar.py <wav> <palabras.json> <hueco_max> [solo_indices]: acorta los silencios entre palabras más largos que hueco_max
# (deja hueco_max, cortando el medio del silencio, con fundidos de 15 ms). Para las líneas largas del recorte r1.
import json, subprocess, sys
wav, pal, hmax = sys.argv[1], json.load(open(sys.argv[2])), float(sys.argv[3])
solo = set(int(i) for i in sys.argv[4].split(",")) if len(sys.argv) > 4 else None
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", wav], capture_output=True, text=True).stdout)
cortes = []
for i in range(len(pal) - 1):
    a, b = pal[i]["end"], pal[i + 1]["start"]
    if (solo is None or i in solo) and b - a > hmax + 0.05: cortes.append((a + hmax / 2, b - hmax / 2))
if not cortes: print(wav, "sin cambios"); sys.exit()
seg, t0 = [], 0.0
for a, b in cortes: seg.append((t0, a)); t0 = b
seg.append((t0, dur))
f = ";".join(f"[0]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st={max(0, b - a - 0.015):.3f}:d=0.015[s{i}]" for i, (a, b) in enumerate(seg))
f += ";" + "".join(f"[s{i}]" for i in range(len(seg))) + f"concat=n={len(seg)}:v=0:a=1"
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-filter_complex", f, "-ar", "48000", "-ac", "1", wav + ".tmp.wav"], check=True)
subprocess.run(["mv", wav + ".tmp.wav", wav], check=True)
print(wav, f"{dur:.2f} →", sum(b - a for a, b in seg).__round__(2), "cortes", [(round(a, 2), round(b, 2)) for a, b in cortes])
