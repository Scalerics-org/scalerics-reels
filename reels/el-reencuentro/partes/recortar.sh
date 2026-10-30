#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: puntas recortadas y pausas internas topeadas (topear.mjs).
# 10 = el público: las 4 voces (10a-d) encimadas.
puntas() { ffmpeg -hide_banner -loglevel error -y -i $1 -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 $2; }
T=/tmp/reencuentro-$$.wav
for n in 01 02 03 04 05 06 07 08 09 11 12 13; do puntas partes/$n.wav $T; node partes/topear.mjs $T partes/$n-c.wav 0.35 -38; done
for v in a b c d; do puntas partes/10$v.wav partes/10$v-c.wav; done
rm -f $T
ffmpeg -hide_banner -loglevel error -y -i partes/10a-c.wav -i partes/10b-c.wav -i partes/10c-c.wav -i partes/10d-c.wav -filter_complex "[1]adelay=70[b];[2]adelay=120[c];[3]adelay=40[d];[0][b][c][d]amix=inputs=4:normalize=0,volume=0.55,alimiter=limit=0.9" -ar 48000 -ac 1 partes/10-c.wav
