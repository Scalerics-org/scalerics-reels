#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios de las puntas recortados (correr desde reels/mision-horario).
for f in partes/[0-9][0-9].wav; do n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$n-c.wav
done
