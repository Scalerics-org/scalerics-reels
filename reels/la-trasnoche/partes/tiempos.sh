#!/bin/bash
# partes/NN-p.wav + NN.txt -> partes/NN.json (tiempos por palabra de cada parlamento)
for f in partes/??-p.wav; do
  n=$(basename $f -p.wav)
  [ -s partes/$n.json ] && continue
  node ../../herramientas/tiempos.mjs $f partes/$n.txt partes/$n.json > partes/$n.tlog 2>&1 || echo "FALLÓ $n"
done
