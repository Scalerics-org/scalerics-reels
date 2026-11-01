#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav sin silencios de punta (y pausas internas largas acortadas). Correr desde reels/conferencia-de-prensa.
for f in partes/[0-9][0-9].wav; do
  n=${f%.wav}
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_duration=0.45:stop_threshold=-40dB:stop_silence=0.35" -ar 48000 -ac 1 $n-c.wav
done
