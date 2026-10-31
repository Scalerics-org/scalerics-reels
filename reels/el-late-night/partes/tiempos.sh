#!/bin/bash
# Tiempos por palabra de cada parlamento recortado (partes/NN-c.wav -> partes/NN.json, log en NN.log).
for f in partes/[0-9][0-9]-c.wav; do n=$(basename $f -c.wav)
  [ -s partes/$n.json ] && continue
  node ../../herramientas/tiempos.mjs $f partes/$n.txt partes/$n.json > partes/$n.log 2>&1 &
done
wait
grep -H "oyó\|interpolado" partes/[0-9][0-9].log
