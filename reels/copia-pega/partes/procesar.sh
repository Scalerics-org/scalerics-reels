#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: recorta silencios de punta, acorta las pausas internas a ~0.3 s
# y acelera (maestro Algenib 1.18, alumno Charon 1.12, Orus 1.12). Después tiempos.mjs -> partes/NN.json.
# Correr desde reels/copia-pega: bash partes/procesar.sh 01 02 ...
for n in "$@"; do
  case $n in 01|03|05|07|09|11) a=1.18;; 12) a=1.12;; *) a=1.12;; esac
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_threshold=-36dB:stop_duration=0.25:stop_silence=0.14,atempo=$a" -ar 48000 -ac 1 partes/$n-c.wav
  node ../../herramientas/tiempos.mjs partes/$n-c.wav partes/$n.txt partes/$n.json > partes/$n.log 2>&1
  echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 partes/$n-c.wav)"; cat partes/$n.log
done
