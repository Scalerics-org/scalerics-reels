import sys,re
bad=0
for f in sys.argv[1:]:
    for i,l in enumerate(open(f),1):
        # posición del primer // fuera de comillas
        q=None; k=-1; j=0
        while j<len(l)-1:
            c=l[j]
            if q:
                if c=='\\': j+=2; continue
                if c==q: q=None
            elif c in '"\'`': q=c
            elif l[j:j+2]=='//' and (j==0 or l[j-1]!=':'): k=j; break
            j+=1
        if k<0: continue
        com=l[k+2:]
        if re.search(r';\s*\S|\)\s*;|\b\w+\s*=\s*[^=>]|=>|\bconst\b|\blet\b|\bif\s*\(|\}\s*$', com):
            print(f"{f}:{i}: {l.strip()[:200]}"); bad+=1
print("sospechosas:",bad)
