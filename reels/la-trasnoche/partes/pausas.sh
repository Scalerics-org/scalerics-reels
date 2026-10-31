#!/bin/bash
# partes/NN-c.wav -> partes/NN-p.wav: las pausas internas de más de ~0.25 s quedan en 0.16 s (el reel va rápido).
for f in partes/??-c.wav; do
  n=$(basename $f -c.wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=stop_periods=-1:stop_duration=0.25:stop_threshold=-35dB:stop_silence=0.16" -ar 48000 -ac 1 partes/$n-p.wav
done
