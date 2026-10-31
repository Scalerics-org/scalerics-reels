#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav sin silencios de punta. Correr desde reels/talle-unico.
for f in partes/[0-9][0-9].wav; do
  n=${f%.wav}
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" $n-c.wav
done
