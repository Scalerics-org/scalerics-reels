#!/bin/bash
# partes/NN.wav -> partes/NN-k.wav: silencios de punta fuera, pausas internas topeadas en ~0.22 s,
# y atempo por voz (la planilla es lenta y dramática: 1.25; el negociador 1.2; la hija 1.12; Orus 1.15).
# Correr desde reels/rehenes.
declare -A A=([01]=1.2 [02]=1.25 [03]=1.2 [04]=1.25 [05]=1.12 [06]=1.25 [07]=1.15 [08]=1.25 [09]=1.08 [10]=1.15 [11]=1.12 [12]=1.22 [13]=1.15)
for n in "${!A[@]}"; do
  ffmpeg -hide_banner -loglevel error -y -i partes/$n.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.22:stop_threshold=-42dB:stop_silence=0.22,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse,atempo=${A[$n]}" partes/$n-k.wav
done
