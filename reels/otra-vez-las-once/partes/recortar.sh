#!/bin/bash
# partes/NN.wav -> partes/NN-k.wav: silencios de punta fuera, pausas internas topeadas en ~0.22 s,
# y atempo por voz (Néstor 1.12, la radio 1.1, Orus 1.12). Correr desde reels/otra-vez-las-once.
declare -A A=([01]=1.08 [02]=1.1 [03]=1.12 [04]=1.12 [05]=1.05 [06]=1.12 [07]=1.12 [08]=1.1 [09]=1.08 [10]=1.1 [11]=1.12 [12]=1.08 [13]=1.12 [14]=1.08 [15]=1.08 [16]=1.08)
for n in "${!A[@]}"; do
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.22:stop_threshold=-42dB:stop_silence=0.22,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${A[$n]}" partes/$n-k.wav
done
# 09 y 14: la voz dijo la frase dos veces; quedarse con la primera
for x in 09:1.9 14:2.36; do n=${x%%:*}; t=${x##*:}
  ffmpeg -hide_banner -loglevel error -y -i partes/$n-k.wav -t $t -af "afade=t=out:st=$(echo "$t-0.08" | bc):d=0.08" partes/$n-k2.wav && mv partes/$n-k2.wav partes/$n-k.wav
done
