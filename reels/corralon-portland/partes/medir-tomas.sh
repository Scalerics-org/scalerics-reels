#!/bin/bash
# recorta silencios de cada toma (partes/rec/) y mide duración + lo que oyó el STT
cd "$(dirname "$0")/.."
for f in partes/tomas/${1:-*}.wav; do
  b=$(basename $f .wav); id=${b%-*}
  [ -f partes/rec/$b.wav ] && [ -z "$FORZAR" ] && continue
  ffmpeg -loglevel error -y -i $f -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.06,areverse" -ar 48000 -ac 1 partes/rec/$b.wav
  d=$(ffprobe -v error -show_entries format=duration -of csv=p=0 partes/rec/$b.wav)
  oyo=$(node ../../herramientas/tiempos.mjs partes/rec/$b.wav partes/$id.txt partes/tmp/pal-$b.json 2>&1 | grep -i "oyó" | head -1)
  printf "%s\t%.2f\t%s\n" $b $d "$oyo" | tee -a partes/rec/medidas.tsv
done
