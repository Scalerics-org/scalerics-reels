#!/bin/bash
# raw/X.wav -> rec/X.wav con los silencios de las puntas recortados; el coro (02x) mezcla 4 voces
SR="silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse"
mkdir -p rec tmp
for f in raw/*.wav; do
  n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "$SR" -ar 48000 -ac 1 tmp/$n.wav
  [[ $n == 02x-* ]] || cp tmp/$n.wav rec/$n.wav
done
# coro: las cuatro voces, con desfasajes chiquitos, para que suene a grupo
ffmpeg -hide_banner -loglevel error -y -i tmp/02x-Kore.wav -i tmp/02x-Leda.wav -i tmp/02x-Puck.wav -i tmp/02x-Fenrir.wav \
  -filter_complex "[1:a]adelay=40[b];[2:a]adelay=90[c];[3:a]adelay=20[d];[0:a][b][c][d]amix=inputs=4:normalize=0,volume=0.55,aecho=0.8:0.6:30:0.25" -ar 48000 -ac 1 rec/02x.wav
for f in rec/*.wav; do printf "%s %s\n" $(basename $f) $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f); done
