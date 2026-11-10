# Mide voz vs. (música + SFX) por tramos de 0,5 s a partir de index.html (sin render)
import re, subprocess, sys, math
html = open('index.html').read()
tags = re.findall(r'<audio id="([^"]+)" src="([^"]+)" data-start="([\d.]+)" data-duration="([\d.]+)"(?: data-fade-out="([\d.]+)")? data-track-index="\d+" data-volume="([\d.]+)"', html)
dur = float(re.search(r'data-composition-id="main" data-start="0" data-duration="([\d.]+)"', html).group(1))
def mix(sel, out):
    ins, fil = [], []
    for k, (i, src, st, d, fo, vol) in enumerate(sel):
        ins += ['-i', src]
        f = f'[{k}:a]atrim=0:{d},aresample=48000,aformat=channel_layouts=stereo,volume={vol}'
        if fo: f += f',afade=t=out:st={float(d)-float(fo)}:d={fo}'
        f += f',adelay={int(float(st)*1000)}|{int(float(st)*1000)},apad=whole_dur={dur}[a{k}]'
        fil.append(f)
    fil.append(''.join(f'[a{k}]' for k in range(len(sel))) + f'amix=inputs={len(sel)}:normalize=0,atrim=0:{dur}[o]')
    subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error',*ins,'-filter_complex',';'.join(fil),'-map','[o]',out], check=True)
voz = [t for t in tags if t[0]=='voz']; resto = [t for t in tags if t[0]!='voz']
mix(voz, '/tmp/claude-0/pqec_voz.wav'); mix(resto, '/tmp/claude-0/pqec_resto.wav')
def rms(f):
    out = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','asetnsamples=24000,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level','-f','null','-'],capture_output=True,text=True).stderr
    return [float(x) if x!='-inf' else -120 for x in re.findall(r'RMS_level=(-?[\d.inf]+)', out)]
a, b = rms('/tmp/claude-0/pqec_voz.wav'), rms('/tmp/claude-0/pqec_resto.wav')
malos = [(i*0.5, round(x-y,1)) for i,(x,y) in enumerate(zip(a,b)) if x > -40 and x - y < 6]
print('tramos con voz < 6 dB sobre el resto:', malos)
print('mínimo:', min((round(x-y,1), i*0.5) for i,(x,y) in enumerate(zip(a,b)) if x > -40))
# lo mismo con sonoridad (ebur128, ventana momentánea de 0,4 s muestreada cada 0,5 s)
def lufs(f):
    out = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128=metadata=1,ametadata=print:key=lavfi.r128.M','-f','null','-'],capture_output=True,text=True).stderr
    vals = re.findall(r'pts_time:([\d.]+)[\s\S]*?lavfi.r128.M=(-?[\d.inf]+)', out)
    res = {}
    for ts, m in vals:
        k = round(float(ts) * 2) / 2
        if abs(float(ts) - k) < 0.011: res[k] = float(m) if 'inf' not in m else -120
    return res
lv, lr = lufs('/tmp/claude-0/pqec_voz.wav'), lufs('/tmp/claude-0/pqec_resto.wav')
d = [(k, round(lv[k] - lr.get(k, -120), 1)) for k in sorted(lv) if lv[k] > -35]
print('LU voz - resto (momentánea, con voz):', 'mínimo', min(d, key=lambda x: x[1]), '· tramos < 6 LU:', [x for x in d if x[1] < 6])
