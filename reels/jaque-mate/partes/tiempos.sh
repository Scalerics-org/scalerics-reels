#!/bin/bash
# Tiempos por palabra de cada parlamento (partes/NN-p.wav + NN.txt -> NN.json, log en NN.log). Correr desde reels/jaque-mate.
for f in partes/[0-9][0-9]-p.wav; do n=$(basename $f -p.wav); [ -s partes/$n.json ] && continue
  node ../../herramientas/tiempos.mjs partes/$n-p.wav partes/$n.txt partes/$n.json > partes/$n.log 2>&1 &
  [ $(jobs -r | wc -l) -ge 4 ] && wait -n
done; wait
for n in $(ls partes/[0-9][0-9].txt | xargs -n1 basename | cut -c1-2); do echo "$n $(grep -h 'oyó\|interpolado' partes/$n.log | tr '\n' ' ')"; done
// 13.json corregido a mano (Jaque arranca en 3.1 s del parlamento)
