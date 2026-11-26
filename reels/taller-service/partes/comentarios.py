# comentarios.py: busca líneas donde un comentario // va ANTES de código en la misma línea (el código quedaría anulado).
# Saltea los // dentro de strings y de plantillas. Uso: python3 partes/comentarios.py gen.mjs assets/tres.js prev.mjs
import re, sys
CODIGO = re.compile(r"(;\s*$)|(;\s*[A-Za-z_$][\w$.]*\s*[=(.])|(^\s*[A-Za-z_$][\w$.]*\s*(=|\+=|\()[^,]*[;)]\s*$)|(\}\s*$)|(\{\s*$)")
malas = 0
for f in sys.argv[1:]:
    for n, l in enumerate(open(f, encoding="utf8"), 1):
        q = None; esc = False; i = 0; k = -1
        while i < len(l):
            c = l[i]
            if q:
                if esc: esc = False
                elif c == "\\": esc = True
                elif c == q: q = None
            elif c in "'\"`": q = c
            elif l.startswith("//", i) and (i == 0 or l[i - 1] != ":"): k = i; break
            elif c == "/" and i + 1 < len(l) and l[i + 1] not in "/*" and re.search(r"[(,=:]\s*$", l[:i]):
                j = l.find("/", i + 1)
                while j > 0 and l[j - 1] == "\\": j = l.find("/", j + 1)
                if j > 0: i = j
            i += 1
        if k < 0: continue
        resto = l[k + 2:]
        if CODIGO.search(resto.rstrip("\n")):
            malas += 1; print(f"{f}:{n}: {l.rstrip()[:160]}")
print(f"{malas} líneas con código después de un //" if malas else "OK: ningún comentario antes de código en la misma línea")
