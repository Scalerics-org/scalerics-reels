#!/bin/bash
# partes/NN.wav -> partes/NN-p.wav: silencios de las puntas recortados y los internos acortados.
for f in partes/??.wav; do
  n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_duration=0.2:stop_threshold=-36dB:stop_silence=0.14" -ar 48000 -ac 1 partes/$n-p.wav
done
