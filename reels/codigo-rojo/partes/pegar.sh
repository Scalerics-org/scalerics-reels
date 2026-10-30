#!/bin/bash
# Arma assets/voice/locucion.wav con los parlamentos (correr desde reels/codigo-rojo).
# partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh) -> atempo por parlamento y pegado con
# silencios. Después: node partes/componer.mjs (palabras.json y guion.txt desde partes/NN.json).
N=(01 02 03 04 05 06 07 08 09 10 11 12 13)
T=(1.03 1.0 1.08 1.03 1.15 1.0 1.06 1.05 1.1 1.08 1.0 1.0 1.03)
G=(0.35 0.35 0.45 0.35 0.45 0.55 0.45 0.55 0.35 0.4 0.3 0.7)
args=""; filt=""; lab=""; k=0
for i in "${!N[@]}"; do
  args="$args -i partes/${N[$i]}-c.wav"; filt="$filt[$k:a]atempo=${T[$i]}[v$k];"; lab="$lab[v$k]"; k=$((k+1))
  if [ $i -lt 12 ]; then args="$args -f lavfi -t ${G[$i]} -i anullsrc=r=48000:cl=mono"; lab="$lab[$k:a]"; k=$((k+1)); fi
done
mkdir -p assets/voice
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${filt}${lab}concat=n=$k:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav
