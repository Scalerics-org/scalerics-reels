#!/bin/bash
# partes/NN.wav -> partes/NN-c.wav: silencios del principio y del final recortados, y los de adentro
# de más de 0.45 s achicados. Correr desde reels/el-grupo-de-los-agentes.
for f in partes/[0-9][0-9].wav; do
  n=$(basename $f .wav)
  ffmpeg -hide_banner -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=-42dB:stop_duration=0.45:stop_silence=0.35,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$n-c.wav
  echo $n $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f) "->" $(ffprobe -v error -show_entries format=duration -of csv=p=0 partes/$n-c.wav)
done
