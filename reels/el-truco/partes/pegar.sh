#!/bin/bash
# Arma assets/voice/locucion.wav con los parlamentos (correr desde reels/el-truco).
# 1) partes/NN.wav (voces.sh) -> partes/NN-c.wav: silencios recortados con silenceremove.
# 2) atempo por parlamento y pegado con silencios (más largos donde reacciona la mesa).
# 3) tiempos: tiempos.mjs sobre cada NN-c.wav -> partes/NN.json; node partes/componer.mjs arma palabras.json.
N=(01 02 03 04 05 06 07 08 09 10 11 12)
T=(1.08 1.08 1.08 1.08 1.08 1.08 1.08 1.08 1.08 1.08 1.08 1.04)
G=(0.4 0.4 0.4 0.55 0.4 0.4 0.55 0.4 0.4 0.75 0.65)
args=""; filt=""; lab=""; k=0
for i in "${!N[@]}"; do
  args="$args -i partes/${N[$i]}-c.wav"; filt="$filt[$k:a]atempo=${T[$i]}[v$k];"; lab="$lab[v$k]"; k=$((k+1))
  if [ $i -lt 11 ]; then args="$args -f lavfi -t ${G[$i]} -i anullsrc=r=48000:cl=mono"; lab="$lab[$k:a]"; k=$((k+1)); fi
done
ffmpeg -hide_banner -loglevel error -y $args -filter_complex "${filt}${lab}concat=n=$k:v=0:a=1[o]" -map "[o]" -ar 48000 -ac 1 -c:a pcm_s16le assets/voice/locucion.wav
# offsets para componer.mjs
off=0
for i in "${!N[@]}"; do
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 partes/${N[$i]}-c.wav)
  echo "${N[$i]} $off ${T[$i]}"
  off=$(echo "$off + $d / ${T[$i]} + ${G[$i]:-0}" | bc -l)
done > partes/offsets.txt
