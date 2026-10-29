#!/bin/bash
# Arma assets/voice/locucion.wav con los parlamentos (correr desde reels/pelea-de-gallos).
# 1) partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios recortados (06 además cortado en 15.30 s:
#    la voz repetía "vengo a devolverte el domingo").
# 2) atempo por parlamento (los raps más rápidos) y pegado con silencios (0.75 s donde hace "uuuh" el público).
# 3) tiempos: tiempos.mjs sobre cada NN-c.wav -> partes/NN.json; node partes/componer.mjs arma palabras.json.
declare -A T=([01]=1.05 [02]=1.13 [03]=1.13 [04]=1.0 [05]=1.13 [06]=1.13 [07]=1.07)
G=(0.4 0.75 0.75 0.4 0.75 0.95)
args=""; filt=""; k=0
for i in 0 1 2 3 4 5 6; do
  n=0$((i+1))
  args="$args -i partes/$n-c.wav"; filt="$filt[$k:a]atempo=${T[$n]}[v$k];"; lab="$lab[v$k]"; k=$((k+1))
  if [ $i -lt 6 ]; then args="$args -f lavfi -t ${G[$i]} -i anullsrc=r=48000:cl=mono"; lab="$lab[$k:a]"; k=$((k+1)); fi
done
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${filt}${lab}concat=n=$k:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav
