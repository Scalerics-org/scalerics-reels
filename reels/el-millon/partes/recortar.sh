#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios de las puntas recortados (silenceremove) y los de
# adentro topeados con topear.mjs (el conductor hace pausas de suspenso largas: quedan en 0.35-0.45 s).
# 07 = el público: las 4 voces (07a-d) encimadas.
puntas() { ffmpeg -hide_banner -loglevel error -y -i $1 -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 $2; }
T=/tmp/millon-$$.wav
for n in 02 04 06 09 11; do puntas partes/$n.wav $T; node partes/topear.mjs $T partes/$n-c.wav 0.4; done
# el conductor respira en las pausas: umbral -35 dB
for n in 01 03 05 08 12; do puntas partes/$n.wav $T; node partes/topear.mjs $T partes/$n-c.wav 0.35 -35; done
puntas partes/10.wav $T; node partes/topear.mjs $T partes/10-c.wav 0.45 -35
puntas partes/13.wav $T; node partes/topear.mjs $T partes/13-c.wav 0.3 -35
for v in a b c d; do puntas partes/07$v.wav partes/07$v-c.wav; done
rm -f $T
ffmpeg -hide_banner -loglevel error -y -i partes/07a-c.wav -i partes/07b-c.wav -i partes/07c-c.wav -i partes/07d-c.wav -filter_complex "[1]adelay=60[b];[2]adelay=110[c];[3]adelay=30[d];[0][b][c][d]amix=inputs=4:normalize=0,volume=0.6,alimiter=limit=0.9" -ar 48000 -ac 1 partes/07-c.wav
