#!/bin/bash
# raw/ -> rec/: recorta silencios de punta, achica pausas internas y acelera (profe x1.18, alumno x1.1, Orus x1.04).
# Uso: bash recortar.sh 01p 02a ...   (después: bash pj.sh <parte> y node unir.mjs)
for b in "$@"; do
  case ${b:2:1} in p) a=1.18;; a) a=1.1;; o) a=1.04;; *) a=1.0;; esac
  ffmpeg -hide_banner -loglevel error -y -i raw/$b.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.05,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse,silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-42dB:stop_silence=0.22,silenceremove=stop_periods=-1:stop_duration=0.24:stop_threshold=-36dB:stop_silence=0.17,atempo=$a" -ar 48000 -ac 1 rec/$b.wav
done
