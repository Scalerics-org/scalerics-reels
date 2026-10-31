#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios de las puntas recortados y los del medio de más de
# 0.3 s acortados a ~0.22 s (correr desde reels/el-mago).
for f in partes/[0-9][0-9].wav; do n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_duration=0.25:stop_threshold=-36dB:stop_silence=0.16" -ar 48000 -ac 1 partes/$n-c.wav
done
