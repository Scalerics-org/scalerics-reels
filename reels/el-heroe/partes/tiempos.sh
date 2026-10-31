#!/bin/bash
# Tiempos por palabra de cada parlamento recortado (partes/NN-c.wav -> partes/NN.json); correr desde reels/el-heroe.
for f in partes/[0-9][0-9]-c.wav; do n=$(basename $f -c.wav)
  [ -s partes/$n.json ] && continue
  for i in $(seq 1 8); do node ../../herramientas/tiempos.mjs $f partes/$n.txt partes/$n.json > partes/$n.log 2>&1 && break; sleep 15; done
  grep -E "oyó|interpol" partes/$n.log | sed "s/^/$n /"
done
