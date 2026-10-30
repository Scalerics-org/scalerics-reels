#!/bin/bash
# genera en serie, con reintentos (la cuota por minuto es compartida)
TONO="Sos un integrante de un grupo de apoyo anónimo que saluda al nuevo al unísono con el resto del grupo: tono monótono, cansino, de ritual, como en las reuniones de Alcohólicos Anónimos."
for b in "$@"; do
  for i in 1 2 3 4 5 6 7 8; do
    if [[ $b == 02x-* ]]; then V=${b#02x-}; out=$(node ../../../herramientas/voz.mjs 02x.txt raw/$b.wav --voz $V --tono "$TONO" 2>&1);
    else out=$(./gen.sh $b 2>&1); fi
    if echo "$out" | grep -q "voz lista"; then echo "ok $b"; break; fi
    echo "reintento $b: $(echo "$out" | grep -o '→ [0-9]*' | head -1)"; sleep 20
  done
done
