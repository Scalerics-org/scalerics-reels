import sys,subprocess,struct,math
f=sys.argv[1]; a=float(sys.argv[2]); b=float(sys.argv[3])
pcm=subprocess.run(["ffmpeg","-loglevel","error","-i",f,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
n=len(pcm)//2; s=struct.unpack("<%dh"%n,pcm); w=160
out=[]
for i in range(int(a*16000),int(b*16000),w):
    seg=s[i:i+w]; e=math.sqrt(sum(x*x for x in seg)/max(1,len(seg)))/32768
    out.append((round(i/16000,3),round(20*math.log10(e+1e-9),1)))
print(" ".join(f"{t}:{d}" for t,d in out))
