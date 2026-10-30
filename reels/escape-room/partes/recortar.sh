#!/bin/bash
# partes/NN.wav -> partes/NN-k.wav: puntas fuera, pausas internas topeadas, atempo por voz.
# Correr desde reels/escape-room.
declare -A A=([01]=1.25 [02]=1.12 [03]=1.22 [04]=1.18 [05]=1.15 [06]=1.18 [07]=1.12 [08]=1.1 [09]=1.15 [10]=1.1 [11]=1.15 [12]=1.2 [13]=1.2 [14]=1.12)
for n in "${!A[@]}"; do
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.25:stop_threshold=-42dB:stop_silence=0.25,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${A[$n]}" partes/$n-k.wav
done
