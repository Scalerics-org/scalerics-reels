#!/bin/bash
# corta y saca tiempos de cada parte que tenga wav y no json. Correr desde reels/querido-diario.
corta() { ffmpeg -hide_banner -loglevel error -y -i partes/$1.wav -af "silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.04,silenceremove=stop_periods=-1:stop_threshold=-32dB:stop_duration=0.25:stop_silence=0.2,areverse,silenceremove=start_periods=1:start_threshold=-42dB:start_silence=0.08,areverse" -ar 48000 -ac 1 partes/$1-c.wav; }
for f in partes/[0-9][0-9].wav; do n=$(basename $f .wav); [ -s partes/$n.json ] && continue; corta $n; node ../../herramientas/tiempos.mjs partes/$n-c.wav partes/$n.txt partes/$n.json 2>&1 | grep -i "oyó" | sed "s/^/$n /"; done
