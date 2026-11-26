import subprocess,re,statistics
g=float(open("assets/audio/ganancia.txt").read())+6
def mom(f):
    out=subprocess.run(["ffmpeg","-hide_banner","-nostats","-i",f,"-af",f"volume={g}dB,ebur128","-f","null","-"],capture_output=True,text=True).stderr
    return [(float(a),float(b)) for a,b in re.findall(r"t:\s*([\d.]+)\s+TARGET.*?M:\s*(-?[\d.]+)",out)]
V=dict((round(t,1),m) for t,m in mom("assets/audio/stem-voz.wav")); R=mom("assets/audio/stem-resto.wav")
con=[m for t,m in R if V.get(round(t,1),-99)>-30]; sin=[m for t,m in R if V.get(round(t,1),-99)<-45]
dv=[V[round(t,1)]-m for t,m in R if V.get(round(t,1),-99)>-30]
print("resto bajo voz mediana",round(statistics.median(con),1),"· sin voz mediana",round(statistics.median(sin),1),"· voz-resto mediana",round(statistics.median(dv),1),"· voz mediana",round(statistics.median([v for v in V.values() if v>-30]),1))
print("voz 0,15-1,6 s:", [round(V.get(round(x/10,1),-99),1) for x in range(2,17,2)])
import sys
a=float(sys.argv[1]) if len(sys.argv)>1 else 0
print("escalón música:", [(round(tt,1),m) for tt,m in R if a-0.4<tt<a+0.5])
