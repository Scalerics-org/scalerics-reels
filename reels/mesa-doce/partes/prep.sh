#!/bin/bash
# recorta las tomas: silencio de punta afuera, pausas internas de más de 0,3 s acortadas, tempo final; y vuelve a sacar los tiempos por palabra
cd "$(dirname "$0")/.."
mkdir -p assets/voice
tempo(){ case $1 in r07) echo 1.03;; d01|d02|r11) echo 1.0;; n01) echo 1.08;; *) echo 1.1;; esac; }
for f in partes/[rdn][0-9]*.txt; do
  b=$(basename $f .txt)
  ffmpeg -y -loglevel error -i partes/$b.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03:stop_periods=-1:stop_duration=0.2:stop_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.1,areverse,atempo=$(tempo $b),afade=t=in:d=0.01" -ar 48000 assets/voice/$b.wav
  node ../../herramientas/tiempos.mjs assets/voice/$b.wav partes/$b.txt partes/pv-$b.json 2>&1 | grep "oyó" | sed "s/^/$b $(ffprobe -v error -show_entries format=duration -of csv=p=0 assets/voice/$b.wav) /"
done
