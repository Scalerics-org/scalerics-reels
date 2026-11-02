#!/bin/bash
# partes/NN.wav -> partes/NN-k.wav: silencios de punta fuera, pausas internas topeadas en ~0.22 s
# (0.5 en el "Control Z" del 11, que es el suspenso), y atempo por voz. Correr desde reels/la-bomba.
declare -A A=([01]=1.12 [02]=1.08 [03]=1.1 [04]=1.1 [05]=1.1 [06]=1.1 [07]=1.08 [08]=1.12 [09]=1.08 [10]=1.06 [11]=1.12 [12]=1.0 [13]=1.0 [14]=1.12 [15]=1.12)
for n in "${!A[@]}"; do
  P=0.22; [ $n = 11 ] && P=0.5
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=$P:stop_threshold=-42dB:stop_silence=$P,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${A[$n]}" partes/$n-k.wav
done
