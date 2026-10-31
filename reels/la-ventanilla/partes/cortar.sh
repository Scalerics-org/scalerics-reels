#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios del principio y del final fuera, los del medio a ~0.2 s.
# Correr desde reels/la-ventanilla.
corta() { # n umbral silencio
  ffmpeg -hide_banner -loglevel error -y -i partes/$1.wav -af "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=$2:stop_duration=$(printf "%.2f" $(echo "$3+0.05" | bc)):stop_silence=$3,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$1-c.wav
}
for n in 01 02 03 04 05 06 07 08 09 10 11 12 13 14; do corta $n -32dB 0.16; done
