#!/bin/bash
# Arma assets/voice/locucion.wav con los parlamentos (correr desde reels/mision-horario).
# partes/NN.wav (voces.sh) -> partes/NN-c.wav (recortar.sh) -> atempo por parlamento y pegado con
# silencios. Después: node partes/componer.mjs (palabras.json y guion.txt desde partes/NN.json).
# Orden: voces.sh, recortar.sh, node partes/pausas.mjs, tiempos.mjs por parte, pegar.sh, node partes/componer.mjs.
# Voces: Algenib = el Jefe (01 02 08 11 13 15), Kore = Agente Cero, Orus = Scalerics (14).
N=(01 02 03 04 05 06 07 08 09 10 11 12 13 14 15)
T=(1.1 1.1 1.15 1.15 1.15 1.15 1.15 1.1 1.15 1.15 1.1 1.15 1.1 1.08 1.08)
G=(0.4 0.35 0.45 0.3 0.3 0.3 0.35 0.3 0.4 0.5 0.4 0.35 0.6 0.45)
args=""; filt=""; lab=""; k=0
for i in "${!N[@]}"; do
  args="$args -i partes/${N[$i]}-c.wav"; filt="$filt[$k:a]atempo=${T[$i]}[v$k];"; lab="$lab[v$k]"; k=$((k+1))
  if [ $i -lt 14 ]; then args="$args -f lavfi -t ${G[$i]} -i anullsrc=r=48000:cl=mono"; lab="$lab[$k:a]"; k=$((k+1)); fi
done
mkdir -p assets/voice
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${filt}${lab}concat=n=$k:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav
