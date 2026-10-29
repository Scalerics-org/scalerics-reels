#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: recorta silencios de punta y acorta las pausas internas a ~0.22 s.
# Correr desde partes/.
for b in "$@"; do
  ffmpeg -hide_banner -loglevel error -y -i $b.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.3:stop_threshold=-45dB:stop_silence=0.22,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse" -ar 48000 -ac 1 $b-c.wav
done
