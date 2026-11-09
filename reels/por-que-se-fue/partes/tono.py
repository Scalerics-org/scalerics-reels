# F0 mediana (Hz) de un tramo: python3.13 partes/tono.py archivo.wav desde hasta
import sys, subprocess, numpy as np
f, a, b = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
raw = subprocess.run(['ffmpeg','-loglevel','error','-ss',str(a),'-t',str(b-a),'-i',f,'-ac','1','-ar','16000','-f','s16le','-'],capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(float)
fs, n, out = 16000, 640, []
for i in range(0, len(x)-n, 160):
    w = x[i:i+n]; w = w - w.mean()
    if np.sqrt((w**2).mean()) < 300: continue
    c = np.correlate(w, w, 'full')[n-1:]
    lo, hi = fs//300, fs//70
    k = lo + np.argmax(c[lo:hi])
    if c[k] > 0.45*c[0]: out.append(fs/k)
print(round(float(np.median(out)),1) if out else 0, len(out))
