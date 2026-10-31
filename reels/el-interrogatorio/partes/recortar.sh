#!/bin/bash
# partes/NN.wav -> partes/NN-k.wav: puntas fuera, pausas internas topeadas, atempo por voz.
# Correr desde reels/el-interrogatorio.
declare -A A=([01]=1.18 [02]=1.1 [03]=1.12 [04]=1.12 [05]=1.1 [06]=1.18 [07]=1.08 [08]=1.1 [09]=1.15 [10]=1.08 [11]=1.12 [12]=1.12 [13]=1.08 [14]=1.0 [15]=1.08)
for n in "${!A[@]}"; do
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.3:stop_threshold=-42dB:stop_silence=0.3,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${A[$n]}" partes/$n-k.wav
done
