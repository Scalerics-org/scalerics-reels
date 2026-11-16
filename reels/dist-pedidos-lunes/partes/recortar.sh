#!/bin/bash
# recorta silencios del principio y del final de cada toma (partes/tomas → partes/rec) y mide qué oyó el STT
cd "$(dirname "$0")/.."
for f in partes/tomas/*.wav; do
  b=$(basename $f .wav)
  [ -f partes/rec/$b.wav ] && continue
  ffmpeg -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse" -ar 48000 -ac 1 partes/rec/$b.wav
done
for f in partes/rec/*.wav; do
  b=$(basename $f .wav); id=${b%-*}
  ( node ../../herramientas/tiempos.mjs $f partes/$id.txt /tmp/claude-0/oye-$b.json 2>&1 | grep -i "oyó" | sed "s#^#$b $(ffprobe -v error -show_entries format=duration -of csv=p=0 $f | cut -c1-4)s #" ) &
done
wait
