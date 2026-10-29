#!/bin/bash
# Arma assets/voice/locucion.wav con los parlamentos (correr desde reels/ultimo-momento).
# partes/NN.wav (voces.sh) -> partes/NN-c.wav (silencios recortados) -> atempo por parlamento y
# pegado con silencios. Después: node partes/componer.mjs (palabras.json desde partes/NN.json).
N=(01 02 03 04 05 06 07 08 09 10 11 12)
T=(1.05 1.05 1.05 1.0 1.0 1.05 1.05 1.05 1.0 1.0 1.0 1.0)
G=(0.5 0.4 0.35 0.3 0.5 0.4 0.45 0.55 0.3 0.7 0.7)
args=""; filt=""; lab=""; k=0
for i in "${!N[@]}"; do
  args="$args -i partes/${N[$i]}-c.wav"; filt="$filt[$k:a]atempo=${T[$i]}[v$k];"; lab="$lab[v$k]"; k=$((k+1))
  if [ $i -lt 11 ]; then args="$args -f lavfi -t ${G[$i]} -i anullsrc=r=48000:cl=mono"; lab="$lab[$k:a]"; k=$((k+1)); fi
done
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${filt}${lab}concat=n=$k:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav
