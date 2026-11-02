#!/bin/bash
# Normaliza el pico, corta silencios y saca tiempos de cada parte que tenga wav y no json. Correr desde reels/asmr.
corta() {
  pk=$(ffmpeg -hide_banner -i partes/$1.wav -af volumedetect -f null - 2>&1 | grep max_volume | awk '{print $5}')
  g=$(echo "-2 - ($pk)" | bc)
  ffmpeg -hide_banner -loglevel error -y -i partes/$1.wav -af "volume=${g}dB,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=-42dB:stop_duration=0.3:stop_silence=0.25,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$1-c.wav
}
for f in partes/[0-9][0-9].wav; do n=$(basename $f .wav); [ -s partes/$n.json ] && continue; corta $n; echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 partes/$n-c.wav)"; node ../../herramientas/tiempos.mjs partes/$n-c.wav partes/$n.txt partes/$n.json 2>&1 | grep -i "oyó" | sed "s/^/$n /"; done
