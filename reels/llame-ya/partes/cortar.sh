#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: puntas recortadas y pausas de adentro topeadas (topear.mjs).
# 08 y 14 = el público: las 4 voces (a-d) encimadas. Correr desde reels/llame-ya.
puntas() { ffmpeg -hide_banner -loglevel error -y -i $1 -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 $2; }
T=/tmp/llameya-$$.wav
for n in 01 02 03 04 05 06 07 09 10 11 12 13 15 16 17 18 19; do puntas partes/$n.wav $T; node partes/topear.mjs $T partes/$n-c.wav 0.2 -38 >/dev/null; done
rm -f $T
for k in 08 14; do
  for v in a b c d; do puntas partes/$k$v.wav partes/$k$v-c.wav; done
  ffmpeg -hide_banner -loglevel error -y -i partes/${k}a-c.wav -i partes/${k}b-c.wav -i partes/${k}c-c.wav -i partes/${k}d-c.wav -filter_complex "[1]adelay=70[b];[2]adelay=120[c];[3]adelay=30[d];[0][b][c][d]amix=inputs=4:normalize=0,volume=0.55,aecho=0.8:0.6:40|70:0.25|0.18,alimiter=limit=0.9" -ar 48000 -ac 1 partes/$k-c.wav
done
