#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: puntas recortadas y pausas internas topeadas (topear.mjs).
puntas() { ffmpeg -hide_banner -loglevel error -y -i $1 -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 $2; }
T=/tmp/quien-$$.wav
for n in ${@:-01 02 03 04 05 06 07 08 09 10 11 12 13 14 15}; do puntas partes/$n.wav $T; node partes/topear.mjs $T partes/$n-c.wav 0.28 -38; done
rm -f $T
