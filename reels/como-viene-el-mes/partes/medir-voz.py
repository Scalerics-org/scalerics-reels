import subprocess,re,sys
def M(f):
    o=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af","ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return [(float(a),float(b)) for a,b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)",o)]
v=M("assets/audio/stem-voz.wav"); r=M("assets/audio/stem-resto.wav")
import collections
W=collections.defaultdict(lambda:[-99,-99])
for t,m in v: W[int((t-0.2)/0.5)][0]=max(W[int((t-0.2)/0.5)][0],m)
for t,m in r: W[int((t-0.2)/0.5)][1]=max(W[int((t-0.2)/0.5)][1],m)
mn=99
for k in sorted(W):
    a,b=W[k]
    if a>-40:
        d=a-b; mn=min(mn,d)
        print(f"{k*0.5:5.1f} voz {a:6.1f} resto {b:6.1f} dif {d:5.1f}{'  <6' if d<6 else ''}")
print("min",mn)
