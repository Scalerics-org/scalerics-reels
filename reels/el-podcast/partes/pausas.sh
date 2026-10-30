#!/bin/bash
# partes/NN-c.wav -> partes/NN-p.wav: las pausas internas de más de ~0.3 s quedan en 0.28 s (el reel va rápido).
for f in partes/??-c.wav; do
  n=$(basename $f -c.wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-40dB:stop_silence=0.24" -ar 48000 -ac 1 partes/$n-p.wav
done
