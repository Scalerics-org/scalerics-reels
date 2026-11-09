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
mix(voz, '/tmp/claude-0/pqsf_voz.wav'); mix(resto, '/tmp/claude-0/pqsf_resto.wav')
def rms(f):
    out = subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','asetnsamples=24000,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level','-f','null','-'],capture_output=True,text=True).stderr
    return [float(x) if x!='-inf' else -120 for x in re.findall(r'RMS_level=(-?[\d.inf]+)', out)]
a, b = rms('/tmp/claude-0/pqsf_voz.wav'), rms('/tmp/claude-0/pqsf_resto.wav')
malos = [(i*0.5, round(x-y,1)) for i,(x,y) in enumerate(zip(a,b)) if x > -40 and x - y < 6]
print('tramos con voz < 6 dB sobre el resto:', malos)
print('mínimo:', min((round(x-y,1), i*0.5) for i,(x,y) in enumerate(zip(a,b)) if x > -40))
